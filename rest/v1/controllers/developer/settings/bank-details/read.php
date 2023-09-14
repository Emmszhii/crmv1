<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$bankDetails = new BankDetails($conn);
// get $_GET data 

if (array_key_exists("bankDetailsId", $_GET)) {
    $bankDetails->bank_details_aid  = $_GET['bankDetailsId'];
    checkId($bankDetails->bank_details_aid);
    $query = checkReadById($bankDetails);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($bankDetails);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
