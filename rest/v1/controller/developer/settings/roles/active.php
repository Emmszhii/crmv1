<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/roles/Roles.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$roles = new Roles($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("rolesId", $_GET)) {
    // check data
    checkPayload($data);
    $roles->roles_aid = $_GET['rolesId'];
    $roles->roles_is_active = trim($data["isActive"]);
    $roles->roles_updated_at = date("Y-m-d H:i:s");
    checkId($roles->roles_aid);
    $query = checkActive($roles);
    http_response_code(200);
    returnSuccess($roles, "Roles", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
