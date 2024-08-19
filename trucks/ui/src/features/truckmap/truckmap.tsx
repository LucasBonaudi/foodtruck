import { Component } from "react";
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from '@react-google-maps/api';
import { useState } from "react"
import { useGetFoodTrucksQuery } from './truckmapApiSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectedTruck, setSelectedTruck } from './truckmapSlice'

export const TruckMap = () => {
    const apiKEY = 'AIzaSyDRdruvB-mVDVc0Hbt59CQhlLCk-h5TItw'

    const dispatch = useAppDispatch()
    const currentTruck = useAppSelector(selectedTruck)

    const { data, error, isLoading } = useGetFoodTrucksQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading food trucks</div>;

    const mapStyles = {
        height: '100vh',
        width: '100%',
      };
    
    const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
    };
    

    return (
        <div>
            <LoadScript googleMapsApiKey={apiKEY}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
                {data?.map((truck) => (
                    <MarkerF 
                    key={truck.locationid}
                    position={{ lat: truck.latitude, lng: truck.longitude }}
                    title={truck.applicant}
                    onClick={() => dispatch(setSelectedTruck(truck)) }
                        >

                    { currentTruck && currentTruck?.locationid == truck.locationid && (
                        <InfoWindowF
                            position={{ lat: currentTruck.latitude, lng: currentTruck.longitude }}
                            onCloseClick={() => dispatch(setSelectedTruck(null)) }
                            >
                            <div>
                                <h3>{currentTruck.applicant}</h3>
                                <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                                </header>
                                <p><b>Address:</b> {currentTruck.address}</p>
                                <p><b>Location details:</b> {currentTruck.location_description}</p> 
                                <p><b>Food Items:</b> {currentTruck.foodItems.replaceAll(":", ",")}</p>
                            </div>
                        </InfoWindowF>
                    )}

                    </MarkerF>
                ))} 
                
                

            </GoogleMap>
        </LoadScript>
      </div>
    )
}