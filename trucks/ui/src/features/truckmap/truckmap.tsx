import { Component } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const TruckMap = () => {
    const apiKEY = 'AIzaSyDRdruvB-mVDVc0Hbt59CQhlLCk-h5TItw'

    const mapStyles = {
        height: '100vh',
        width: '100%',
      };
    
      const defaultCenter = {
        lat: 37.7749,
        lng: -122.4194,
      };
    

    return (
        <LoadScript googleMapsApiKey={apiKEY}>
        <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
          {/* {foodTrucks.map((truck) => (
            <Marker
              key={truck.locationid}
              position={{ lat: truck.latitude, lng: truck.longitude }}
              title={truck.applicant}
            />
          ))} */}
        </GoogleMap>
      </LoadScript>
    )
}