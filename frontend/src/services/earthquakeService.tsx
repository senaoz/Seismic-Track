import { Earthquake } from "../interfaces";

const API_URL = "http://localhost:8000/api";

export const fetchAllEarthquakes = async () => {
  try {
    const response = await fetch(`${API_URL}/earthquakes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data.map((earthquake: any) => {
      earthquake.lat = parseFloat(earthquake.lat);
      earthquake.lon = parseFloat(earthquake.lon);
      earthquake.magnitude = parseFloat(earthquake.magnitude);
      earthquake.created_at = new Date(earthquake.created_at);
      return earthquake;
    });

    return data;
  } catch (error) {
    console.error("Error fetching earthquakes:", error);
    throw error;
  }
};

export const fetchLatestEarthquake = async () => {
  try {
    const response = await fetch(`${API_URL}/earthquakes/latest`);
    const data = await response.json();
    data.lat = parseFloat(data.lat);
    data.lon = parseFloat(data.lon);
    data.magnitude = parseFloat(data.magnitude);
    data.created_at = new Date(data.created_at);
    return data;
  } catch (error) {
    console.error("Error fetching latest earthquake:", error);
    throw error;
  }
};

export const fetchStrongestEarthquake = async () => {
  try {
    const response = await fetch(`${API_URL}/earthquakes/strongest`);
    const data = await response.json();
    data.lat = parseFloat(data.lat);
    data.lon = parseFloat(data.lon);
    data.magnitude = parseFloat(data.magnitude);
    data.created_at = new Date(data.created_at);
    return data;
  } catch (error) {
    console.error("Error fetching strongest earthquake:", error);
    throw error;
  }
};

export const addEarthquake = async (earthquake: Earthquake) => {
  try {
    const response = await fetch(`${API_URL}/earthquakes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(earthquake),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding earthquake:", error);
    throw error;
  }
};
