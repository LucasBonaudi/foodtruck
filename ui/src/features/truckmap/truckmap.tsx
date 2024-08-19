import { useEffect, useState, useRef } from "react";
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from '@react-google-maps/api';
import { useGetFoodTrucksQuery } from './truckmapApiSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectedTruck, setSelectedTruck, fetchUserLocation, userLocation } from './truckmapSlice'
import { getFoodItemsFilter } from '../header/headerSlice'
import styles from './Truckmap.module.css'
import { LatLngBounds } from './interfaces'

export const TruckMap = () => {
    const apiKEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY 

    const dispatch = useAppDispatch()
    const currentTruck = useAppSelector(selectedTruck)
    const usrLocation = useAppSelector(userLocation)
    const foodItemfilter = useAppSelector(getFoodItemsFilter)

    const [bounds, setBounds] = useState<LatLngBounds | null>(null);

    const { data, error, isLoading } = useGetFoodTrucksQuery({ foodItemfilter, bounds });

    const mapRef = useRef<google.maps.Map | null>(null);

    const handleBoundsChanged = () => {
        if (mapRef.current) {
            const bounds = mapRef.current.getBounds();
            if (bounds) {
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                setBounds({
                    northEast: { lat: ne.lat(), lng: ne.lng() },
                    southWest: { lat: sw.lat(), lng: sw.lng() }
                });
            }
        }
    };

    useEffect(() => {
        dispatch(fetchUserLocation())  
    }, [dispatch]);
      
    return (
        <div className="h100">
            <LoadScript googleMapsApiKey={apiKEY}>
            <GoogleMap 
                mapContainerStyle={{
                    height: '97%',
                    width: '100%',
                }} 
                zoom={12} 
                center={usrLocation ? usrLocation : { lat: 37.7749, lng: -122.4194 }} 
                onIdle={() => handleBoundsChanged()}
                onLoad={(map: google.maps.Map) => { mapRef.current = map }} >
                {data?.map((truck) => (
                    <MarkerF 
                    key={truck.locationid}
                    position={{ lat: truck.latitude, lng: truck.longitude }}
                    title={truck.applicant}
                    onClick={() => { dispatch(setSelectedTruck(truck)) }}
                        >

                    { currentTruck && currentTruck?.locationid == truck.locationid && (
                        <InfoWindowF
                            position={{ lat: currentTruck.latitude, lng: currentTruck.longitude }}
                            onCloseClick={() => dispatch(setSelectedTruck(null)) }
                            >
                            <div>
                                <h3>{currentTruck.applicant}</h3>
                                <header className={styles.infocardHeader}>
                                </header>
                                <p><b>Address:</b> {currentTruck.address}</p>
                                <p><b>Location details:</b> {currentTruck.location_description}</p> 
                                <p><b>Food Items:</b> {currentTruck.foodItems?.replaceAll(":", ",")}</p>
                            </div>
                        </InfoWindowF>
                    )}

                    </MarkerF>
                ))} 
                
                {usrLocation && (
                    <MarkerF
                    position={usrLocation}
                    icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                    title="You are here"
                    />
                )}

            </GoogleMap>
        </LoadScript>
      </div>
    )
}