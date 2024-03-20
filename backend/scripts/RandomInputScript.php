<?php

while (true) {
    $lat = rand(-90, 90) + (rand(0, 10000) / 10000);
    $lon = rand(-180, 180) + (rand(0, 10000) / 10000);
    $magnitude = rand(0, 9) + (rand(0, 10) / 10);


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

    sleep(1);
}

?>