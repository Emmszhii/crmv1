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
    // check data
    checkPayload($data);
    // get data
    $infoEngagement->info_engagement_aid  = $_GET['infoEngagementId'];
    $infoEngagement->info_engagement_name = checkIndex($data, "info_engagement_name");
    $infoEngagement->info_engagement_description = checkIndex($data, "info_engagement_description");
    $infoEngagement->info_engagement_updated_at = date("Y-m-d H:i:s");
    checkId($infoEngagement->info_engagement_aid);

    // check name
    isNameExist($infoEngagement, $infoEngagement->info_engagement_name);
    // update
    $query = checkUpdate($infoEngagement);
    returnSuccess($infoEngagement, "Info Engagement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
