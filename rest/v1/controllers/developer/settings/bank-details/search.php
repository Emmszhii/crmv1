<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/bank-details/BankDetails.php';

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$bankDetails = new BankDetails($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// check data
if (empty($_GET)) {
    checkPayload($data);
    $bankDetails->bank_details_search = checkIndex($data, 'search');
    $query = checkSearch($bankDetails);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoinnt not available
checkEndpoint();
http_response_code(200);
