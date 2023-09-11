<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$roles = new Roles($conn);
// get $_GET data 

if (array_key_exists("rolesId", $_GET)) {
    $roles->roles_aid = $_GET['rolesId'];
    checkId($roles->roles_aid);
    $query = checkReadById($roles);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($roles);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
