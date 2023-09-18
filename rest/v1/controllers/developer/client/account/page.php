<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/client/account/ClientAccount.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientAccount = new ClientAccount($conn);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $clientAccount->client_account_start = $_GET['start'];
    $clientAccount->client_account_total = 10;

    // check to see if tas id in query string is not empty and is number, if not return json
    checkLimitId($clientAccount->client_account_start, $clientAccount->client_account_total);
    $query = checkReadLimit($clientAccount);
    $total_result = checkReadAll($clientAccount);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $clientAccount->client_account_total,
        $clientAccount->client_account_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();
http_response_code(200);
