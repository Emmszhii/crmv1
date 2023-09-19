<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$infoEngagement = new Engagement($conn);
// get should not be present
if (array_key_exists("infoRolesId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$infoEngagement->info_engagement_name = checkIndex($data, "info_engagement_name");
$infoEngagement->info_engagement_description = checkIndex($data, "info_engagement_description");
$infoEngagement->info_engagement_info_id = checkIndex($data, "info_engagement_info_id");
$infoEngagement->info_engagement_is_active = 1;
$infoEngagement->info_engagement_created_at = date("Y-m-d H:i:s");
$infoEngagement->info_engagement_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($infoEngagement, $infoEngagement->info_engagement_name);
// create
$query = checkCreate($infoEngagement);
returnSuccess($infoEngagement, "Info Engagement", $query);
