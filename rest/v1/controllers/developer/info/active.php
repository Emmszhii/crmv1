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
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("infoId", $_GET)) {
    // check data
    checkPayload($data);
    $info->info_aid = $_GET['infoId'];
    $info->info_is_active = trim($data["isActive"]);
    $info->info_updated_at = date("Y-m-d H:i:s");
    checkId($info->info_aid);
    $query = checkActive($info);
    http_response_code(200);
    returnSuccess($info, "Info", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
