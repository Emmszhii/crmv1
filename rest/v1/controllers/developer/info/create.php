<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$info = new Info($conn);
// get should not be present
if (array_key_exists("infoId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$info->info_name = checkIndex($data, "info_name");
$info->info_description = checkIndex($data, "info_description");

$info->info_is_active = 1;
$info->info_created_at = date("Y-m-d H:i:s");
$info->info_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($info, $info->info_name);
// create
$query = checkCreate($info);
returnSuccess($info, "Info", $query);
