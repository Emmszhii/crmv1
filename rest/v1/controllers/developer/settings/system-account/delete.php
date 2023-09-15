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
    // get data
    $systemAccount->system_account_aid   = $_GET['systemAccountId'];
    checkId($systemAccount->system_account_aid);

    $query = checkDelete($systemAccount);
    returnSuccess($systemAccount, "System Account", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
