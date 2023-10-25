<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Roles($conn);
// get $_GET data
// check if roleid is in the url e.g. /roleid/1
$error = [];
$returnData = [];
if (array_key_exists("rolesId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get rolesId from query string
    $role->settings_roles_aid = $_GET['rolesId'];
    // $role->role_name = addslashes(trim($data["role_name"]));
    $role->settings_roles_description = addslashes(trim($data["settings_roles_description"]));
    $role->settings_roles_updated_at = date("Y-m-d H:i:s");

    checkId($role->settings_roles_aid);

    $query = checkUpdate($role);

    returnSuccess($role, "Roles", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
