<?php

if (count($argv) >= 4) {
    $lat = $argv[1];
    $lon = $argv[2];
    $magnitude = $argv[3];
} else {
    echo "Enter the latitude: ";
    $lat = trim(fgets(STDIN));
    echo "Enter the longitude: ";
    $lon = trim(fgets(STDIN));
    echo "Enter the magnitude: ";
    $magnitude = trim(fgets(STDIN));
}

if (!is_numeric($lat) || !is_numeric($lon) || !is_numeric($magnitude)) {
    echo "Latitude, longitude, and magnitude must be numbers\n";
    exit(1);
}

$data = json_encode(array(
    'lat' => (float) $lat,
    'lon' => (float) $lon,
    'magnitude' => (float) $magnitude
));

$url = 'http://localhost:8000/api/earthquakes';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
$response = curl_exec($ch);
curl_close($ch);

echo "Data added successfully: Latitude: $lat, Longitude: $lon, Magnitude: $magnitude\n";

?>
