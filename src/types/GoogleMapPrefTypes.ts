import React from "react";
type GoogleMapPrefsTypes ={
    zoom:number,
    center:google.maps.LatLng | google.maps.LatLngLiteral | undefined,
    onLoad: ((map: google.maps.Map) => void | Promise<void>) | undefined,
    onUnmount: ((map: google.maps.Map) => void | Promise<void>) | undefined,
    mapContainerStyle:React.CSSProperties | undefined,
    options:google.maps.MapOptions | undefined,
}
export default GoogleMapPrefsTypes;