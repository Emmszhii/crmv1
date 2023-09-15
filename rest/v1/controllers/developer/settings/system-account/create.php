<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemAccount = new SystemAccount($conn);
// get should not be present
if (array_key_exists("systemAccountId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$systemAccount->system_account_name = checkIndex($data, "system_account_name");
$systemAccount->system_account_email = checkIndex($data, "system_account_email");
$systemAccount->system_account_role = checkIndex($data, "system_account_role");
$systemAccount->system_account_is_active = 1;
$systemAccount->system_account_created_at = date("Y-m-d H:i:s");
$systemAccount->system_account_updated_at = date("Y-m-d H:i:s");
// // check email
isEmailExist($systemAccount, $systemAccount->system_account_email);
// create
$query = checkCreate($systemAccount);
returnSuccess($systemAccount, "System Account", $query);
