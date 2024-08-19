export interface TrucksApiResponse {
    locationid: number;
    latitude: number;
    longitude: number;
    applicant: string;
    address: string;
    location_description: string;
    foodItems: string;
}
  
export interface LatLngBounds {
    northEast: { lat: number; lng: number };
    southWest: { lat: number; lng: number };
}
  
export interface TrucksApiQuery {
    foodItemfilter: string;
    bounds: LatLngBounds | null;
}

export interface TrucksState {
    selectedTruck: TrucksApiResponse | null;
    userLocation: any,
    locationError: any,
}
  

