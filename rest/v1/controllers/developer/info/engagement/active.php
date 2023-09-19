<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/info/engagement/Engagement.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoEngagement = new Engagement($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("infoEngagementId", $_GET)) {
    // check data
    checkPayload($data);
    $infoEngagement->info_engagement_aid = $_GET['infoEngagementId'];
    $infoEngagement->info_engagement_is_active = trim($data["isActive"]);
    $infoEngagement->info_engagement_updated_at = date("Y-m-d H:i:s");
    checkId($infoEngagement->info_engagement_aid);
    $query = checkActive($infoEngagement);
    http_response_code(200);
    returnSuccess($infoEngagement, "Info Engagement", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
