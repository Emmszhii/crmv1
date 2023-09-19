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
    // get data
    $infoRoles->info_roles_aid = $_GET['infoRolesId'];
    checkId($infoRoles->info_roles_aid);

    $query = checkDelete($infoRoles);
    returnSuccess($infoRoles, "Info Roles", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
