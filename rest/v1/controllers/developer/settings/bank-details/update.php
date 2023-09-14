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
    // check data
    checkPayload($data);
    // get data
    $bankDetails->bank_details_aid = $_GET['bankDetailsId'];
    $bankDetails->bank_details_account_name = checkIndex($data, "bank_details_account_name");
    $bankDetails->bank_details_account_number = checkIndex($data, "bank_details_account_number");
    $bankDetails->bank_details_location = checkIndex($data, "bank_details_location");
    $bankDetails->bank_details_updated_at = date("Y-m-d H:i:s");
    checkId($bankDetails->bank_details_aid);

    // check name
    isNameExist($bankDetails, $bankDetails->bank_details_account_name);
    // update
    $query = checkUpdate($bankDetails);
    returnSuccess($bankDetails, "Bank Details", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
