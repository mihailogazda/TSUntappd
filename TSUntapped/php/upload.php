<?php

	/*
	 *	Simple PHP file that downloads file from URL and outputs path on server.
	 *	This image file is also resized to square dimensions.
	 */

	$filenameIn = $_GET["image"];
	
	$directory = __DIR__ . "/uploaded_images/";
	
	if (!file_exists($directory)){
		mkdir($directory);
	}
	
	$filenameOut =  basename($filenameIn);
	
	//	form path to save file to
	$fullFilenameOut = $directory . $filenameOut;
	
	//	get file contents
	$contentOrFalseOnFailure = file_get_contents($filenameIn);
	if ($contentOrFalseOnFailure){
		$byteCountOrFalseOnFailure = file_put_contents($fullFilenameOut, $contentOrFalseOnFailure);
		if ($byteCountOrFalseOnFailure){
			//	if all is successfull then
			echo $fullFilenameOut;
		}
	}
?>