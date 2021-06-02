<?php
class controller_contact
{
	function __construct()
	{
		$_SESSION['module'] = "contact";
	}


	function send_contact_dogs()
	{

		if (isset($_GET['fin_data'][5]['value'])) {
			$type = $_GET['fin_data'][5]['value'];
		} else {
			$type = 'contact';
		}
		if (isset($_GET['fin_data'][6]['value'])) {
			$token = $_GET['fin_data'][5]['value'];
		} else {
			$token = '';
		}

		$arrArgument = [
			'type' => $type,
			'token' => $token,
			'inputName' => $_GET['fin_data'][0]['value'],
			'inputEmail' => $_GET['fin_data'][1]['value'],
			'inputSubject' => $_GET['fin_data'][2]['value'],
			'inputMessage' => $_GET['fin_data'][3]['value']
		];
	
		try {
			echo json_encode(mail::send_email($arrArgument));
		} catch (Exception $e) {
			echo "<div class='alert alert-error'>Server error. Try later...</div>";
		}
		restore_error_handler();

	}
}
