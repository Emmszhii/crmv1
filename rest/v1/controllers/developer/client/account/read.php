<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientAccount = new ClientAccount($conn);
// get $_GET data 

if (array_key_exists("clientAccountId", $_GET)) {
    $clientAccount->client_account_aid = $_GET['clientAccountId'];
    checkId($clientAccount->client_account_aid);
    $query = checkReadById($clientAccount);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($clientAccount);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
