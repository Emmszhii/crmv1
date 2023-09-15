<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemAccount = new SystemAccount($conn);
// get $_GET data 

if (array_key_exists("systemAccountId", $_GET)) {
    $systemAccount->system_account_aid = $_GET['systemAccountId'];
    checkId($systemAccount->system_account_aid);
    $query = checkReadById($systemAccount);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($systemAccount);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
