<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientList = new ClientList($conn);
// get should not be present
if (array_key_exists("clientListId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$clientList->client_list_account_number = checkIndex($data, "client_list_account_number");
$clientList->client_list_company_name = checkIndex($data, "client_list_company_name");
$clientList->client_list_company_email = checkIndex($data, "client_list_company_email");
$clientList->client_list_contact_email = checkIndex($data, "client_list_contact_email");
$clientList->client_list_company_mobile = checkIndex($data, "client_list_company_mobile");
$clientList->client_list_is_active = 1;
$clientList->client_list_created_at = date("Y-m-d H:i:s");
$clientList->client_list_updated_at = date("Y-m-d H:i:s");
// // check email
// isEmailExist($clientList, $clientList->system_account_email);
// create
$query = checkCreate($clientList);
returnSuccess($clientList, "Client List", $query);
