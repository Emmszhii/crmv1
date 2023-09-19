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
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    $infoEngagement->info_engagement_start = $_GET['start'];
    $infoEngagement->info_engagement_total = 3;
    $infoEngagement->info_engagement_info_id = $_GET['infoId'];
    checkId($infoEngagement->info_engagement_info_id);

    // check to see if has id in query string is not empty and is number, if not return json
    checkLimitId($infoEngagement->info_engagement_start, $infoEngagement->info_engagement_total);
    $query = checkReadLimit($infoEngagement);
    $total_result = checkReadAll($infoEngagement);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $infoEngagement->info_engagement_total,
        $infoEngagement->info_engagement_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
