<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$info = new Info($conn);
// get $_GET data 

if (array_key_exists("infoId", $_GET)) {
    $info->info_aid = $_GET['infoId'];
    checkId($info->info_aid);
    $query = checkReadById($info);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($info);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
