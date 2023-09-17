<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientList = new ClientList($conn);
// get $_GET data 

if (array_key_exists("clientListId", $_GET)) {
    $clientList->client_list_aid  = $_GET['clientListId'];
    checkId($clientList->client_list_aid );
    $query = checkReadById($clientList);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($clientList);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
