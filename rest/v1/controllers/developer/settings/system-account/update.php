<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemAccount = new SystemAccount($conn);
// get $_GET data

$error = [];
$returnData = [];
if (array_key_exists("systemAccountId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $systemAccount->system_account_aid  = $_GET['systemAccountId'];
    $systemAccount->system_account_name = checkIndex($data, "system_account_name");
    $systemAccount->system_account_email = checkIndex($data, "system_account_email");
    $systemAccount->system_account_role = checkIndex($data, "system_account_role");
    $systemAccount->system_account_updated_at = date("Y-m-d H:i:s");
    checkId($systemAccount->system_account_aid);

    // check email exist
    isEmailExist($systemAccount, $systemAccount->system_account_email);

    // update
    $query = checkUpdate($systemAccount);
    returnSuccess($systemAccount, "System Account", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
