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
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("clientAccountId", $_GET)) {
    // check data
    checkPayload($data);
    $clientAccount->client_account_aid     = $_GET['clientAccountId'];
    $clientAccount->client_account_is_active = trim($data["isActive"]);
    $clientAccount->client_account_update_at = date("Y-m-d H:i:s");
    checkId($clientAccount->client_account_aid);
    $query = checkActive($clientAccount);
    http_response_code(200);
    returnSuccess($clientAccount, "Client Account", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
