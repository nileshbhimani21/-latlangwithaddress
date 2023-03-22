import React, { useState, useEffect, useRef } from 'react'

const MyMapInner = ({latlong, showPosition}) => {
  const [zoom] = useState(15); // initial zoom
  const [center, setCenter] = useState({
    lat: 37.090240,
    lng: -95.712891,
  });

  useEffect(() => {
    if (latlong !== undefined && latlong?.length > 0) {
      setCenter({
        lat: latlong[0],
        lng: latlong[1]
      })
    }
  }, [latlong])


  const ref = useRef();
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    })
    map.setCenter({
      lat: center.lat,
      lng: center.lng,
    })

    // Create markers.
    // eslint-disable-next-line no-unused-vars
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(center),
      icon: require("../marker.svg").default,
      map: map,
      draggable: true,
    });
    marker.addListener("dragend", function(e) {
      const position = {coords: {latitude: e.latLng.lat(),longitude:e.latLng.lng()}}
      showPosition(position)
  });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);
  return <div className='map_box' ref={ref} id="map" style={{ height: '400px', width: '100%' }} />;
}
export default MyMapInner
