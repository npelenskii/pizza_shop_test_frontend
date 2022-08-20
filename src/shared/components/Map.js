import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";

import "./Map.css";

const SHOP_COORDINATES = {
    lat: 50.450089,
    lng: 30.524188,
};

const Map = (props) => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [mapProps, setMapsProps] = useState({
        zoom: 10,
        center: { lat: 50.450089, lng: 30.524188 },
    });
    const [direction, setDirection] = useState({ response: null });

    useEffect(() => {
        if (markerPosition && SHOP_COORDINATES) {
            const directionsService =
                new window.google.maps.DirectionsService();
            const origin = SHOP_COORDINATES;
            const destination = markerPosition;

            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirection({
                            response: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [markerPosition]);

    const MapClick = useCallback((event) => {
        const coordinates = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkerPosition(coordinates);
        props.mapClick(coordinates);
        setMapsProps({
            zoom: 15,
            center: coordinates,
        });
        // eslint-disable-next-line
    }, []);

    return (
        <GoogleMap
            zoom={mapProps.zoom}
            center={mapProps.center}
            mapContainerClassName="map-container"
            onClick={MapClick}
        >
            <Marker position={SHOP_COORDINATES} />
            {markerPosition && (
                <Marker className="marker" position={markerPosition} />
            )}
            {markerPosition !== null &&
                SHOP_COORDINATES !== null &&
                direction.response && (
                    <DirectionsRenderer
                        options={{
                            directions: direction.response,
                        }}
                    />
                )}
        </GoogleMap>
    );
};

export default Map;
