'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from "react";
import useKakaoLoader from "./use-kakao-loader"; 
import { MAP_CENTER } from '@/app/lib/constants';
import { Marker, Position } from '@/app/lib/kakao-map-definitions';

export default function KakaoMap({ focusStore, onMapClick }: { focusStore: Marker, onMapClick: (lat: number, lon: number) => void }) {
  useKakaoLoader();
  
  const [center, setCenter] = useState<Position>(MAP_CENTER);
  const [marker, setMarker] = useState<Marker>();

  useEffect(() => {
    setMarker(focusStore);
    setCenter(focusStore.position);
  }, [focusStore]);

  return (
    <Map
      center={center}
      className="rounded-md"
      style={{height: "450px"}}
      level={3}
      onClick={(_, mouseEvent) => {
        const lat = mouseEvent.latLng.getLat();
        const lon = mouseEvent.latLng.getLng();
        onMapClick(lat, lon);
        setMarker({ position: { lat: lat, lng: lon } });
      }}
    >
      {
        marker && 
        <MapMarker
          key={`marker-${marker.label}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
        >
          {marker.label && <div style={{color:"#000"}}>{marker.label}</div>}
        </MapMarker>
      }
    </Map>
  );
}