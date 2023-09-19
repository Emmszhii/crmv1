<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/infoRoles/roles/Roles.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoRoles = new Roles($conn);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $infoRoles->info_roles_start = $_GET['start'];
    $infoRoles->info_roles_total = 3;

    // check to see if tas id in query string is not empty and is number, if not return json
    checkLimitId($infoRoles->info_roles_start, $infoRoles->info_roles_total);
    $query = checkReadLimit($infoRoles);
    $total_result = checkReadAll($infoRoles);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $infoRoles->info_roles_total,
        $infoRoles->info_roles_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
