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
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $bankDetails->bank_details_start = $_GET['start'];
    $bankDetails->bank_details_total = 4;

    // check to see if tas id in query string is not empty and is number, if not return json
    checkLimitId($bankDetails->bank_details_start, $bankDetails->bank_details_total);
    $query = checkReadLimit($bankDetails);
    $total_result = checkReadAll($bankDetails);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $bankDetails->bank_details_start,
        $bankDetails->bank_details_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
