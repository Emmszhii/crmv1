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
    // check data
    checkPayload($data);
    // get data
    $roles->roles_aid = $_GET['rolesId'];
    $roles->roles_name = checkIndex($data, "roles_name");
    $roles->roles_description = checkIndex($data, "roles_description");
    $roles->roles_updated_at = date("Y-m-d H:i:s");
    checkId($roles->roles_aid);

    // check name
    isNameExist($roles, $roles->roles_name);
    // update
    $query = checkUpdate($roles);
    returnSuccess($roles, "Roles", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
