<?php

// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
// require 'functions.php';
// use needed classes 
require '../../../../../models/developer/settings/users/roles/Roles.php';
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key

// GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = require 'read.php';
    sendResponse($result);
    exit;
}
// POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}
// PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $result = require 'update.php';
    sendResponse($result);
    exit;
}
// DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = require 'delete.php';
    sendResponse($result);
    exit;
}

http_response_code(200);
