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
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("systemAccountId", $_GET)) {
    // check data
    checkPayload($data);
    $systemAccount->system_account_aid   = $_GET['systemAccountId'];
    $systemAccount->system_account_is_active = trim($data["isActive"]);
    $systemAccount->system_account_updated_at = date("Y-m-d H:i:s");
    checkId($systemAccount->system_account_aid);
    $query = checkActive($systemAccount);
    http_response_code(200);
    returnSuccess($systemAccount, "System Account", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
