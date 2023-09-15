<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/system-account/SystemAccount.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$systemAccount = new SystemAccount($conn);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $systemAccount->system_account_start = $_GET['start'];
    $systemAccount->system_account_total = 3;

    // check to see if tas id in query string is not empty and is number, if not return json
    checkLimitId($systemAccount->system_account_start, $systemAccount->system_account_total);
    $query = checkReadLimit($systemAccount);
    $total_result = checkReadAll($systemAccount);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $systemAccount->system_account_total,
        $systemAccount->system_account_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();
http_response_code(200);
