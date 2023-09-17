<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/client/list/ClientList.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clientList = new ClientList($conn);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $clientList->client_list_start = $_GET['start'];
    $clientList->client_list_total = 10;

    // check to see if tas id in query string is not empty and is number, if not return json
    checkLimitId($clientList->client_list_start, $clientList->client_list_total);
    $query = checkReadLimit($clientList);
    $total_result = checkReadAll($clientList);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $clientList->client_list_total,
        $clientList->client_list_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();
http_response_code(200);
