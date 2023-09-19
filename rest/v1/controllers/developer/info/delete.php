<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$info = new Info($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("infoId", $_GET)) {
    // get data
    $info->info_aid = $_GET['infoId'];
    checkId($info->info_aid);

    $query = checkDelete($info);
    returnSuccess($info, "Info", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
