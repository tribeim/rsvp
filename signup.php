<?php
require_once('mailchimp_configuration.php');
require_once('MCAPI.class.php');
$email = $_POST['email'];
$name = $_POST['name'];
$mailchimp = new MCAPI($apikey);
if ($mailchimp->listSubscribe($list_id, $email, array('NAME' => $name)) === true) {
	echo 'Success';
} else {
	header("HTTP/1.0 403 Forbidden");
	echo 'Error: ' . $mailchimp->errorMessage;
}