<?php
global $conn;
require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($_SERVER['REQUEST_URI'] === '/api/earthquakes') {
        $sql = "SELECT * FROM earthquake_monitoring.earthquakes ORDER BY created_at DESC";
        $result = $conn->query($sql);
        $earthquakes = array();
        while ($row = $result->fetch_assoc()) {
            $earthquakes[] = $row;
        }
        echo json_encode($earthquakes);
    } elseif ($_SERVER['REQUEST_URI'] === '/api/earthquakes/latest') {
        $sql = "SELECT * FROM earthquake_monitoring.earthquakes ORDER BY created_at DESC LIMIT 1";
        $result = $conn->query($sql);
        $earthquake = $result->fetch_assoc();
        echo json_encode($earthquake);
    } elseif ($_SERVER['REQUEST_URI'] === '/api/earthquakes/strongest') {
        $sql = "SELECT * FROM earthquake_monitoring.earthquakes ORDER BY magnitude DESC LIMIT 1";
        $result = $conn->query($sql);
        $earthquake = $result->fetch_assoc();
        echo json_encode($earthquake);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SERVER['REQUEST_URI'] === '/api/earthquakes') {
        $data = json_decode(file_get_contents('php://input'), true);

        $data['magnitude'] = (float) $data['magnitude'];
        $data['lat'] = (float) $data['lat'];
        $data['lon'] = (float) $data['lon'];

        $sql = "INSERT INTO earthquake_monitoring.earthquakes (magnitude, lat, lon) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("dds", $data['magnitude'], $data['lat'], $data['lon']);
        if ($stmt->execute()) {
            echo "New earthquake added successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if ($_SERVER['REQUEST_URI'] === '/api/earthquakes') {
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "DELETE FROM earthquake_monitoring.earthquakes WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $data['id']);
        if ($stmt->execute()) {
            echo "Earthquake deleted successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if ($_SERVER['REQUEST_URI'] === '/api/earthquakes') {
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE earthquake_monitoring.earthquakes SET magnitude = ?, lat = ?, lon = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("dsi", $data['magnitude'], $data['lat'], $data['lon'], $data['id']);
        if ($stmt->execute()) {
            echo "Earthquake updated successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    }
} else {
    echo "Unsupported request method.";

    echo json_encode(array(
        'endpoints' => array(
            '/api/earthquakes' => array(
                'GET' => 'Get all earthquakes',
                'POST' => 'Add a new earthquake',
                'PUT' => 'Update an earthquake',
                'DELETE' => 'Delete an earthquake'
            ),
            '/api/earthquakes/latest' => array(
                'GET' => 'Get the latest earthquake'
            ),
            '/api/earthquakes/strongest' => array(
                'GET' => 'Get the strongest earthquake'
            )
        )
    ));
}

$conn->close();
?>