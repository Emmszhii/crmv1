<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientAccount = new ClientAccount($conn);
// get should not be present
if (array_key_exists("clientAccountId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$clientAccount->client_account_contact_name = checkIndex($data, "client_account_contact_name");
$clientAccount->client_account_contact_email = checkIndex($data, "client_account_contact_email");
$clientAccount->client_account_number = checkIndex($data, "client_account_number");
$clientAccount->client_account_company_name = checkIndex($data, "client_account_company_name");
$clientAccount->client_account_role = checkIndex($data, "client_account_role");
$clientAccount->client_account_is_active = 1;
$clientAccount->client_account_created_at = date("Y-m-d H:i:s");
$clientAccount->client_account_update_at = date("Y-m-d H:i:s");
// // check email
// isEmailExist($clientAccount, $clientAccount->system_account_email);
// create
$query = checkCreate($clientAccount);
returnSuccess($clientAccount, "Client Account", $query);
