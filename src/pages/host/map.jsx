// MapSearch.jsx
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapSearch = () => {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [105.8342, 21.0285],
      zoom: 12,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });

    mapInstance.addControl(geocoder);
    geocoder.on("result", (event) => {
      setAddress(event.result.place_name);
    });

    setMap(mapInstance);

    return () => mapInstance.remove(); // Dọn dẹp khi component bị unmount
  }, []);

  const handleSaveAddress = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/save-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      console.log("Địa chỉ đã được lưu:", data);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSaveAddress}>
        <input
          type="text"
          value={address}
          readOnly
          placeholder="Địa chỉ sẽ xuất hiện ở đây"
        />
        <button type="submit">Lưu địa chỉ</button>
      </form>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapSearch;
