<?php
include 'key.php'; // genrate your own key include file here
// Set the API key and API URL
$API_URL = 'https://api.openai.com/v1/chat/completions';

// Get the user input from the client-side
$input = $_POST['promptInput'];

// Create the request payload
$data = array(
    'model' => 'gpt-3.5-turbo',
    'messages' => array(
        array(
            'role' => 'user',
            'content' => $input
        )
    )
);

// Encode the payload to JSON
$payload = json_encode($data);

// Set the headers
$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $API_KEY
);

// Initialize cURL
$ch = curl_init($API_URL);

// Set the cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Execute the cURL request
$response = curl_exec($ch);

// Close the cURL session
curl_close($ch);

// Check if the request was successful
if ($response === false) {
    echo 'Error occurred while generating.';
} else {
    // Decode the JSON response
    $data = json_decode($response, true);

    // Get the generated content
    $generatedContent = $data['choices'][0]['message']['content'];

    // Send the generated content back to the client-side
    echo $generatedContent;
}
?>
