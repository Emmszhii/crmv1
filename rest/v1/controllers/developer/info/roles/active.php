<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/roles/roles/Roles.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoRoles = new Roles($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("infoRolesId", $_GET)) {
    // check data
    checkPayload($data);
    $infoRoles->info_roles_aid  = $_GET['infoRolesId'];
    $infoRoles->info_roles_is_active = trim($data["isActive"]);
    $infoRoles->info_roles_updated_at = date("Y-m-d H:i:s");
    checkId($infoRoles->info_roles_aid);
    $query = checkActive($infoRoles);
    http_response_code(200);
    returnSuccess($roleinfoRoles, "Info Roles", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
