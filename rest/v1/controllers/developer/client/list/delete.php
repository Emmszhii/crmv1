<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientList = new ClientList($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("clientListId", $_GET)) {
    // get data
    $clientList->client_list_aid    = $_GET['clientListId'];
    checkId($clientList->client_list_aid);

    $query = checkDelete($clientList);
    returnSuccess($clientList, "Client List", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
