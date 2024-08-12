import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Circle,
  GoogleMap,
  Libraries,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import CustomInputField from "./CustomInputField";

const defaultContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
  border: "1px solid var(--color-gray-200)",
};

const libraries: Libraries = ["places"];

interface MapLocationProps {
  containerStyle?: React.CSSProperties;
  center?: google.maps.LatLngLiteral;
  radius?: number;
}

/**
 * Functional component for displaying a Google Map with location functionalities.
 * @param {MapLocationProps} center - The center coordinates of the map.
 * @param {React.CSSProperties} containerStyle - The style object for the map container.
 * @param {number} radius - The radius of the selected marker on the map.
 */
const MapLocation = ({ center, containerStyle, radius }: MapLocationProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [defaultCenter, setDefaultCenter] = useState<google.maps.LatLngLiteral>(
    { lat: 0, lng: 0 }
  );
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onAutocompleteLoad = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null && autocomplete.getPlace()) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const position = {
          lat: location.lat(),
          lng: location.lng(),
        };
        setDefaultCenter(position);
        setMarkerPosition(position);
        map?.panTo(location);
      }
    } else {
      console.log("Autocomplete is not loaded yet or no place selected.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setDefaultCenter(userLocation);
          setMarkerPosition(userLocation);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onMarkerClick = () => {
    if (markerPosition) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (results)
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            console.log("Location to save:", {
              lat: markerPosition.lat,
              lng: markerPosition.lng,
              address,
            });
            // Here you would make an API call to save the location to your database
            // Example: saveLocationToDatabase(markerPosition.lat, markerPosition.lng, address);
          } else {
            console.error("Geocoder failed due to:", status);
          }
      });
    }
  };

  return isLoaded ? (
    <div className="flex flex-col gap-3">
      <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
        <CustomInputField
          width="40%"
          name="address"
          customClass="flex-1"
          type="text"
          ref={inputRef}
          placeholder="⚲ Street, city, country"
          label="Search location..."
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle ?? defaultContainerStyle}
        center={center ?? defaultCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Circle around the marker */}
        {markerPosition && (
          <Circle
            center={markerPosition}
            radius={radius ?? 100} // Set the radius in meters
            options={{
              strokeColor: "#035656",
              strokeOpacity: 1,
              strokeWeight: 3,
              fillColor: "#035656",
              fillOpacity: 0.3,
            }}
          />
        )}
        {/* Marker with click event */}
        {markerPosition && (
          <MarkerF position={markerPosition} onClick={onMarkerClick} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default MapLocation;
