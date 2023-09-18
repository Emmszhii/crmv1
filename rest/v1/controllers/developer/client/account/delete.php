<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientAccount = new ClientAccount($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("clientAccountId", $_GET)) {
    // get data
    $clientAccount->client_account_aid = $_GET['clientAccountId'];
    checkId($clientAccount->client_account_aid);

    $query = checkDelete($clientAccount);
    returnSuccess($clientAccount, "Client Account", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
