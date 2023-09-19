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
    // check data
    checkPayload($data);
    // get data
    $info->info_aid = $_GET['infoId'];
    $info->info_name = checkIndex($data, "info_name");
    $info->info_description = checkIndex($data, "info_description");


    $info->info_updated_at = date("Y-m-d H:i:s");
    checkId($info->info_aid);

    // check name
    isNameExist($info, $info->info_name);
    // update
    $query = checkUpdate($info);
    returnSuccess($info, "Info", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
