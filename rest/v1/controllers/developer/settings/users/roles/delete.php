<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Roles($conn);
// get $_GET data
// check if roleid is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("rolesId", $_GET)) {
    // get data
    // get task id from query string
    $role->settings_roles_aid = $_GET['rolesId'];
    $column_name = strtolower(str_replace(" ", "_", $data["settings_roles_name"]));
    $is_developer = $data['isDeveloper'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($role->settings_roles_aid);
    // delete

    $query = checkDelete($role);

    returnSuccess($role, "Roles", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
