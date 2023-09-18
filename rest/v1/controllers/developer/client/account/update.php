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
    // check data
    checkPayload($data);
    // get data
    $clientAccount->client_account_aid   = $_GET['clientAccountId'];
    $clientAccount->client_account_contact_name = checkIndex($data, "client_account_contact_name");
    $clientAccount->client_account_contact_email = checkIndex($data, "client_account_contact_email");
    $clientAccount->client_account_number = checkIndex($data, "client_account_number");
    $clientAccount->client_account_company_name = checkIndex($data, "client_account_company_name");
    $clientAccount->client_account_role = checkIndex($data, "client_account_role");
    $clientAccount->client_account_update_at = date("Y-m-d H:i:s");
    checkId($clientAccount->client_account_aid);

    // check email exist
    // isEmailExist($clientAccount, $clientAccount->client_account_contact_email);

    // update
    $query = checkUpdate($clientAccount);
    returnSuccess($clientAccount, "Client List", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
