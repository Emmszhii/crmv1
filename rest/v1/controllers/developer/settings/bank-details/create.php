<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$bankDetails = new BankDetails($conn);
// get should not be present
if (array_key_exists("bankDetailsId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$bankDetails->bank_details_bank_name = checkIndex($data, "bank_details_bank_name");
$bankDetails->bank_details_account_name = checkIndex($data, "bank_details_account_name");
$bankDetails->bank_details_account_number = checkIndex($data, "bank_details_account_number");
$bankDetails->bank_details_location = checkIndex($data, "bank_details_location");
$bankDetails->bank_details_is_active = 1;
$bankDetails->bank_details_created_at = date("Y-m-d H:i:s");
$bankDetails->bank_details_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($bankDetails, $bankDetails->bank_details_bank_name);
// create
$query = checkCreate($bankDetails);
returnSuccess($bankDetails, "Bank Details", $query);
