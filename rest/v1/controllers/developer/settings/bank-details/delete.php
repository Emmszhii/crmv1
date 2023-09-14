<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$bankDetails = new BankDetails($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("bankDetailsId", $_GET)) {
    // get data
    $bankDetails->bank_details_aid  = $_GET['bankDetailsId'];
    checkId($bankDetails->bank_details_aid);

    $query = checkDelete($bankDetails);
    returnSuccess($bankDetails, "Bank Details", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
