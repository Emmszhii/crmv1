<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$roles = new Roles($conn);
// get should not be present
if (array_key_exists("rolesId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$roles->roles_name = checkIndex($data, "roles_name");
$roles->roles_description = checkIndex($data, "roles_description");
$roles->roles_is_active = 1;
$roles->roles_created_at = date("Y-m-d H:i:s");
$roles->roles_updated_at = date("Y-m-d H:i:s");
// // check name
// isNameExist($roles, $roles->roles_name);
// create
$query = checkCreate($roles);
returnSuccess($roles, "roles", $query);
