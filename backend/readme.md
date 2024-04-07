# Earthquake API

This is a simple API that allows users to add and retrieve earthquake data. The API is built using PHP. The database is a MySQL database.

## Endpoints

### Get All Earthquakes Data

#### `GET /api/earthquakes`

This endpoint allows the user to retrieve **all earthquakes** data from the database.

#### Response Parameters

| Field      | Type   | Required | Description                     |
|------------|--------| -------- |---------------------------------|
| id         | number | false    | The id of the  earthquake       |
| latitude   | number | false    | The latitude of the earthquake  |
| longitude  | number | false    | The longitude of the earthquake |
| magnitude  | number | false    | The magnitude of the earthquake |
| created_at | date   | false    | The date and time of the earthquake|

#### Response Example

```json
[
    {
        "id": 1,
        "latitude": 34.0522,
        "longitude": -118.2437,
        "magnitude": 4.5,
        "created_at": "2021-08-01 12:00:00"
    },
    {
        "id": 2,
        "latitude": 34.0522,
        "longitude": -118.2437,
        "magnitude": 4.5,
        "created_at": "2021-08-01 12:00:00"
    }
]
```

### Get Latest Earthquake Data

#### `GET /api/earthquakes/latest`

This endpoint allows the user to retrieve the latest earthquake data from the database.

### Get Strongest Earthquake Data

#### `GET /api/earthquakes/strongest`

This endpoint allows the user to retrieve the strongest earthquake data from the database.

### Add Earthquake Data

#### `POST /api/earthquake`

This endpoint allows the user to add earthquake data to the database.

#### Request Body

| Field     | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| latitude  | number | true     | The latitude of the earthquake |
| longitude | number | true     | The longitude of the earthquake |
| magnitude | number | true     | The magnitude of the earthquake |

##### Example

```json
{
    "latitude": 34.0522,
    "longitude": -118.2437,
    "magnitude": 4.5
}
```

### Put and Delete Earthquake Data

#### `PUT /api/earthquakes`

This endpoint allows the user to update an earthquake data in the database **where the id is specified.**

#### Request Body Example

```json
{
    "id": 1,
    "latitude": 34.0522,
    "longitude": -118.2437,
    "magnitude": 4.5
}
```

#### `DELETE /api/earthquakes`

This endpoint allows the user to delete an earthquake data from the database  **where the id is specified.**

#### Request Body Example

```json
{
    "id": 1
}
```

## Scripts

### Manual Input Script

This script allows the user to manually input earthquake data. It sends a POST request to the API to add the earthquake data to the database.
Latitude, longitude, and magnitude are required and must be numbers.

#### Usage
`cd scripts && php ManualInputScript.php <latitude> <longitude> <magnitude>` or ask the user for input 

```bash
cd scripts && php ManualInputScript.php 
```

#### Example
`php ManualInputScript.php 34.0522 -118.2437 4.5`

#### Example 2
`php ManualInputScript.php` and then input the latitude, longitude, and magnitude when prompted.

### Random Input Script

This script generates random earthquake data and sends a POST request to the API to add the earthquake data to the database while the user terminates the script.

#### Usage
```bash
cd scripts && php RandomInputScript.php
```

## Starting the API

To start the API, run the following command:

```bash
php -S localhost:8000 
```
