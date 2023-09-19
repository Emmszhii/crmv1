<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoRoles = new Roles($conn);
// get should not be present
if (array_key_exists("infoRolesId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$infoRoles->info_roles_name = checkIndex($data, "info_roles_name");
$infoRoles->info_roles_description = checkIndex($data, "info_roles_description");
$infoRoles->info_id = checkIndex($data, "info_id");
$infoRoles->info_roles_is_active = 1;
$infoRoles->info_roles_created_at = date("Y-m-d H:i:s");
$infoRoles->info_roles_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($infoRoles, $infoRoles->info_roles_name);
// create
$query = checkCreate($infoRoles);
returnSuccess($infoRoles, "Info Roles", $query);
