<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoEngagement = new Engagement($conn);
// get $_GET data 

if (array_key_exists("infoEngagementId", $_GET)) {
    $infoEngagement->info_engagement_aid  = $_GET['infoEngagementId'];
    checkId($infoEngagement->info_engagement_aid);
    $query = checkReadById($infoEngagement);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($infoEngagement);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
