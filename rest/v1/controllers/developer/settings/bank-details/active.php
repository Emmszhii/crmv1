<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/bank-details/BankDetails.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$bankDetails = new BankDetails($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("bankDetailsId", $_GET)) {
    // check data
    checkPayload($data);
    $bankDetails->bank_details_aid  = $_GET['bankDetailsId'];
    $bankDetails->bank_details_is_active = trim($data["isActive"]);
    $bankDetails->bank_details_updated_at = date("Y-m-d H:i:s");
    checkId($bankDetails->bank_details_aid);
    $query = checkActive($bankDetails);
    http_response_code(200);
    returnSuccess($bankDetails, "Bank Details", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
