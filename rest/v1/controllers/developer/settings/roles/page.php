<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/roles/Roles.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$roles = new Roles($conn);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $roles->roles_start = $_GET['start'];
    $roles->roles_total = 2;

    // check to see if tas id in query string is not empty and is number, if not return json
    checkLimitId($roles->roles_start, $roles->roles_total);
    $query = checkReadLimit($department);
    $total_result = checkReadAll($department);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $department->department_total,
        $department->department_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
