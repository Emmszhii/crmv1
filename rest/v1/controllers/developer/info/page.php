<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/info/Info.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$info = new Info($conn);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $info->info_start = $_GET['start'];
    $info->info_total = 3;

    // check to see if tas id in query string is not empty and is number, if not return json
    checkLimitId($info->info_start, $info->info_total);
    $query = checkReadLimit($info);
    $total_result = checkReadAll($info);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $info->info_total,
        $info->info_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
