<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoEngagement = new Engagement($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("infoEngagementId", $_GET)) {
    // get data
    $infoEngagement->info_engagement_aid = $_GET['infoEngagementId'];
    checkId($infoEngagement->info_engagement_aid);

    $query = checkDelete($infoEngagement);
    returnSuccess($infoEngagement, "Info Engagement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
