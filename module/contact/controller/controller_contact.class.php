<?php
class controller_contact
{
	function __construct()
	{
		$_SESSION['module'] = "contact";
	}

	function list()
	{
		////ENTRA!!!
		require_once(VIEW_PATH_INC . "top_page_contact.php");
		require_once(VIEW_PATH_INC . "header.html");
		require_once(VIEW_PATH_INC . "menu.html");
		loadView(VIEW_PATH_CONTACT . "contact_list.html");

		require_once(VIEW_PATH_INC . "footer.html");
	}


	function send_contact_dogs()
	{
		// echo json_encode($_GET['fin_data']);

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

		// $data_mail = json_decode($_POST['fin_data'], true);
		$arrArgument = [
			'type' => $type,
			'token' => $token,
			'inputName' => $_GET['fin_data'][0]['value'],
			'inputEmail' => $_GET['fin_data'][1]['value'],
			'inputSubject' => $_GET['fin_data'][2]['value'],
			'inputMessage' => $_GET['fin_data'][3]['value']
		];
		// echo json_encode($arrArgument);

		// set_error_handler('ErrorHandler');
		try {
			echo json_encode(mail::send_email($arrArgument));
		} catch (Exception $e) {
			echo "<div class='alert alert-error'>Server error. Try later...</div>";
		}
		restore_error_handler();

		// $arrArgument = array(
		// 	'type' => 'admin',
		// 	'token' => '',
		// 	'inputName' => $data_mail['cname'],
		// 	'inputEmail' => $data_mail['cemail'],
		// 	'inputSubject' => $data_mail['matter'],
		// 	'inputMessage' => $data_mail['message']
		// );
		// try {
		// 	enviar_email($arrArgument);
		// } catch (Exception $e) {
		// 	echo "<div class='alert alert-error'>Server error. Try later...</div>";
		// }
	}
}
