<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/info/engagement/Engagement.php';

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoEngagement = new Engagement($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// check data
if (empty($_GET)) {
    checkPayload($data);
    $infoEngagement->info_engagement_search = checkIndex($data, 'search');
    $infoEngagement->info_engagement_info_id = checkIndex($data, 'infoId');
    checkId($infoEngagement->info_engagement_info_id);
    $query = checkSearch($infoEngagement);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
http_response_code(200);
