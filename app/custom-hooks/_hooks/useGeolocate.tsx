"use client";

import { useEffect, useState } from "react";

function useGeolocate(): GeolocationCoordinates | null {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

  // fetching the coordinates
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Your browser does not support geolocation!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords(pos.coords);
      },
      (err) => {
        console.log("Geolocation error", err);
        alert("Failed to fetch location");
      }
    );
  }, []);

  return coords;
}

export default useGeolocate;
