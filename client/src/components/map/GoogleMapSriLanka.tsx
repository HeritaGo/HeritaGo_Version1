import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface GoogleMapSriLankaProps {
  searchQuery: string;
  activeCategories: string[];
}

const places: Place[] = [
  { id: "sigiriya", name: "Sigiriya Rock Fortress", lat: 7.957, lng: 80.760 },
  { id: "galle", name: "Galle Fort", lat: 6.032, lng: 80.217 },
  { id: "kandy", name: "Temple of the Tooth", lat: 7.293, lng: 80.641 },
  { id: "ella", name: "Ella Rock", lat: 6.848, lng: 81.046 },
  { id: "unawatuna", name: "Unawatuna Beach", lat: 6.009, lng: 80.251 },
  { id: "yala", name: "Yala National Park", lat: 6.470, lng: 81.519 }
];

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 7.8731, // Center of Sri Lanka
  lng: 80.7718
};



export default function GoogleMapSriLanka(  { searchQuery, activeCategories }: GoogleMapSriLankaProps ) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7.5}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false
        }}
      >
        {places.map(place => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
