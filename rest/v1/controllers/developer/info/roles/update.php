<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoRoles = new Roles($conn);
// get $_GET data

$error = [];
$returnData = [];
if (array_key_exists("infoRolesId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $infoRoles->info_roles_aid = $_GET['infoRolesId'];
    $infoRoles->info_roles_name = checkIndex($data, "info_roles_name");
    $infoRoles->info_roles_description = checkIndex($data, "info_roles_description");
    $infoRoles->info_id = checkIndex($data, "info_id");

    $infoRoles->info_roles_updated_at = date("Y-m-d H:i:s");
    checkId($infoRoles->info_roles_aid);

    // check name
    isNameExist($infoRoles, $infoRoles->info_roles_name);
    // update
    $query = checkUpdate($infoRoles);
    returnSuccess($infoRoles, "Info Roles", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
