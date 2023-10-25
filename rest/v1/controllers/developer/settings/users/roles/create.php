<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Roles($conn);
// get should not be present
if (array_key_exists("rolesId", $_GET)) {
    $response->setSuccess(false);
    $error['code'] = "404";
    $error['message'] = "Endpoint not found.";
    $error["success"] = false;
    return $error;
}
// check data
checkPayload($data);
// get data
$role->settings_roles_name = addslashes(trim($data["settings_roles_name"]));
$role->settings_roles_description = addslashes(trim($data["settings_roles_description"]));
$role->settings_roles_is_active = 1;
$role->settings_roles_created_at = date("Y-m-d H:i:s");
$role->settings_roles_updated_at = date("Y-m-d H:i:s");

// check name
isNameExist($role, $role->settings_roles_name);
// create
$query = checkCreate($role);
returnSuccess($role, "Roles", $query);
