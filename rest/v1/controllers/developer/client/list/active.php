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
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("clientListId", $_GET)) {
    // check data
    checkPayload($data);
    $clientList->client_list_aid    = $_GET['clientListId'];
    $clientList->client_list_is_active = trim($data["isActive"]);
    $clientList->client_list_updated_at = date("Y-m-d H:i:s");
    checkId($clientList->client_list_aid);
    $query = checkActive($clientList);
    http_response_code(200);
    returnSuccess($clientList, "Client List", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
