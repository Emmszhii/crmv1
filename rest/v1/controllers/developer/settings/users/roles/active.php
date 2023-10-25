<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../../models/developer/settings/users/roles/Roles.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$roles = new Roles($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if roleid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];

if (array_key_exists("rolesId", $_GET)) {
    // check data
    checkPayload($data);
    // get task id from query string
    $roles->settings_roles_aid = $_GET['rolesId'];
    $roles->settings_roles_is_active = trim($data["isActive"]);
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($roles->settings_roles_aid);
    $query = checkActive($roles);
    http_response_code(200);
    returnSuccess($roles, "Roles", $query);
}
// return 404 error if endpoint not available


http_response_code(200);
// when authentication is cancelled 
