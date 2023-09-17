<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientList = new ClientList($conn);
// get $_GET data

$error = [];
$returnData = [];
if (array_key_exists("clientListId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $clientList->client_list_aid   = $_GET['clientListId'];
    $clientList->client_list_account_number = checkIndex($data, "client_list_account_number");
    $clientList->client_list_company_name = checkIndex($data, "client_list_company_name");
    $clientList->client_list_company_email = checkIndex($data, "client_list_company_email");
    $clientList->client_list_contact_email = checkIndex($data, "client_list_contact_email");
    $clientList->client_list_company_mobile = checkIndex($data, "client_list_company_mobile");
    $clientList->client_list_updated_at = date("Y-m-d H:i:s");
    checkId($clientList->client_list_aid);

    // check email exist
    // isEmailExist($clientList, $clientList->client_list_company_name);

    // update
    $query = checkUpdate($clientList);
    returnSuccess($clientList, "Client List", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
