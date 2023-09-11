<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$roles = new Roles($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("rolesId", $_GET)) {
    // get data
    $roles->roles_aid = $_GET['rolesId'];
    checkId($roles->roles_aid);

    $query = checkDelete($roles);
    returnSuccess($roles, "Roles", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
