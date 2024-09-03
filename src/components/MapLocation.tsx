import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import MyLocationIcon from "@mui/icons-material/MyLocation";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
  markerPos?: google.maps.LatLngLiteral;
  radius?: number;
  usePlaceAutocomplete?: boolean;
  onMarkerClick?: (location: ILocation) => void;
}

/**
 * Functional component for displaying a Google Map with location functionalities.
 *
 * @param {MapLocationProps} center - The center coordinates of the map.
 * @param {React.CSSProperties} containerStyle - The style object for the map container.. default height: 400px;
 * @param {number} radius - The radius of the selected marker on the map.
 * @param {(address: ILocation) => void} onMarkerClick - The function to be called when the marker is clicked.
 * @param {MapLocationProps}  markerPos - The position of the marker.
 */
const MapLocation = ({
  center,
  containerStyle,
  radius,
  markerPos,
  usePlaceAutocomplete,
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
    useState<google.maps.LatLngLiteral | null>(markerPos || null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Callback function to set the map object and adjust the bounds of the map based on the center coordinates.
  // This function is triggered when the map is loaded.
  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      // Create a new LatLngBounds object based on the center coordinates.
      const bounds = new window.google.maps.LatLngBounds(center);
      // Adjust the bounds of the map to fit the bounds of the center coordinates.
      map.fitBounds(bounds);
      // Set the map object to be used in the component.
      setMap(map);
      // Add event listener for zoom changes
    },
    [center] // Dependency array to ensure the callback is re-created if the center coordinates change.
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onAutocompleteLoad = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    console.log("auto complete instance", autocompleteInstance);
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    try {
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
    } catch (error) {
      console.error(error);
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
          setDefaultCenter(userLocation);
          setMarkerPosition(userLocation);
          map?.panTo(userLocation);
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

  const handleOnMarkerClick = () => {
    if (markerPosition) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (results) {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            const radius: ILocation = {
              lat: markerPosition.lat,
              long: markerPosition.lng,
              address,
            };
            onMarkerClick?.(radius);
            showToast({ message: "Location set", type: "success" }); // Tooltip notification
          } else {
            console.error("Geocoder failed due to:", status);
          }
        }
      });
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(position);
    }
  };

  useEffect(() => {
    if (!center) getCurrentLocation();
    else {
      setMarkerPosition(center);
    }
  }, []);
  useEffect(() => {}, [markerPosition]);
  useEffect(() => {
    if (markerPos) {
      setMarkerPosition(markerPos);
      setDefaultCenter(markerPos);
    } else if (center) {
      setMarkerPosition(center);
      setDefaultCenter(center);
    } else {
      getCurrentLocation();
    }
  }, [center, markerPos]);

  const [shouldRenderCircle, setShouldRenderCircle] = useState(false);

  useEffect(() => {
    const delayRender = setTimeout(() => {
      setShouldRenderCircle(true);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(delayRender);
  }, [markerPosition]);

  return isLoaded ? (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3 items-end">
        {usePlaceAutocomplete ? (
          <PlacesAutocomplete setSelected={setMarkerPosition} map={map} />
        ) : (
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <CustomInputField
              customClass="min-w-[250px]"
              name="address"
              width="100%"
              type="text"
              ref={inputRef}
              placeholder="⚲ Street, city, country"
              label="Search location..."
            />
          </Autocomplete>
        )}

        <ButtonComponent
          btnHeight="small"
          minWidth="fit-content"
          btnWidth="30px"
          variantType="outlined"
          onClick={() => {
            getCurrentLocation();
          }}
        >
          <MyLocationIcon />
        </ButtonComponent>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle ?? defaultContainerStyle}
        center={center ?? defaultCenter}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {/* Circle around the marker */}
        {shouldRenderCircle && (
          <Circle
            center={markerPosition ?? center}
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

const PlacesAutocomplete = ({
  setSelected,
  map,
}: {
  setSelected: Dispatch<SetStateAction<google.maps.LatLngLiteral | null>>;
  map: google.maps.Map | null;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    map?.panTo(results[0].geometry.location);
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="border border-gray-200 rounded-md px-2 py-1 text-sm w-80"
        placeholder="Search an address"
      />
      <ComboboxPopover className="z-[6000]">
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className="text-sm"
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
