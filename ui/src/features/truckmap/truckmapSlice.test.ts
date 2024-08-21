import { error } from "console"
import type { AppStore } from "../../app/store"
import { makeStore } from "../../app/store"
import type { TrucksState } from "./interfaces"
import {
    truckSlice,
    setSelectedTruck,
    selectedTruck,
    userLocation
} from "./truckmapSlice"

interface LocalTestContext {
  store: AppStore
}

const initialTruck = {
    locationid: 364218,
    latitude: 37.78788969990609,
    longitude: -122.40053532677749,
    foodItems: "Hot Indian Chai (Tea)",
    applicant: "The Chai Cart",
    address: "79 NEW MONTGOMERY ST",
    location_description: "NEW MONTGOMERY ST: AMBROSE BIERCE ST to MISSION ST (77 - 99)"
}

describe<LocalTestContext>("truckmap reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: TrucksState = {
        selectedTruck: initialTruck,
        userLocation: { 
            lat: 37.7701942820569,
            lng: -122.42546357318999
        },
        locationError: null
    }

    const store = makeStore({ trucks: initialState })

    context.store = store
  })

  it("should handle initial state", () => {
    expect(truckSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
        selectedTruck: null,
        userLocation: null,
        locationError: null
    })
  })

  it("should handle set selected truck", ({ store }) => {
    expect(selectedTruck(store.getState())).toBe(initialTruck)

    const newSelectedTruck = {
        locationid: 1723891,
        applicant: "Brazuca Grill",
        location_description: "ARMSTRONG AVE: HAWES ST to INGALLS ST (1300 - 1399)",
        address: "1315 ARMSTRONG AVE",
        latitude: 37.723078757516,
        longitude: -122.38752570401662,
        foodItems: "Cold Truck: Sandwiches: Noodles:  Pre-packaged Snacks: Candy: Desserts Various Beverages"
    }

    store.dispatch(setSelectedTruck(newSelectedTruck))

    expect(selectedTruck(store.getState())).toBe(newSelectedTruck)
  })
})
