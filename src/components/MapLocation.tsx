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
import ButtonComponent from "./ButtonComponent";
import { showToast } from "../utils/ui/notifications";
import { ILocation } from "../pages/Settings/common/settings";

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
  onMarkerClick?: (address: ILocation) => void;
}

/**
 * Functional component for displaying a Google Map with location functionalities.
 * @param {MapLocationProps} center - The center coordinates of the map.
 * @param {React.CSSProperties} containerStyle - The style object for the map container.
 * @param {number} radius - The radius of the selected marker on the map.
 * @param {(address: ILocation) => void} onMarkerClick - The function to be called when the marker is clicked.
 */
const MapLocation = ({
  center,
  containerStyle,
  radius,
  onMarkerClick,
}: MapLocationProps) => {
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(userLocation);
          setDefaultCenter(userLocation);
          setMarkerPosition(userLocation);
        },
        (error) => {
          console.error("Error getting user's location:", error);
          showToast({ message: error.message, type: "error" });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log("");
  }, [markerPosition]);

  const handleOnMarkerClick = () => {
    if (markerPosition) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (results)
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            const radius: ILocation = {
              lat: markerPosition.lat,
              long: markerPosition.lng,
              address,
            };
            onMarkerClick?.(radius);

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
      <div className="flex flex-row gap-3 items-end">
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <CustomInputField
            name="address"
            type="text"
            ref={inputRef}
            placeholder="⚲ Street, city, country"
            label="Search location..."
          />
        </Autocomplete>
        <ButtonComponent
          btnHeight="small"
          minWidth="fit-content"
          btnWidth="105px"
          variantType="outlined"
          onClick={() => {
            getCurrentLocation();
          }}
        >
          <span className="capitalize text-xs">View Device Location</span>
        </ButtonComponent>
      </div>
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
            radius={radius ?? 50} // Set the radius in meters
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
          <MarkerF position={markerPosition} onClick={handleOnMarkerClick} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default MapLocation;
