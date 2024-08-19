import { error } from "console"
import type { AppStore } from "../../app/store"
import { makeStore } from "../../app/store"
import {
    setFilters,
    getFoodItemsFilter,
    headerSlice
} from "./headerSlice"

interface LocalTestContext {
  store: AppStore
}

const initialState = {
    foodItemsFilter: '',
};

describe<LocalTestContext>("counter reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const store = makeStore({ header: initialState })

    context.store = store
  })

  it("should handle initial state", () => {
    expect(headerSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
      foodItemsFilter: ""
    })
  })

  it("should handle set filters", ({ store }) => {
    expect(getFoodItemsFilter(store.getState())).toBe('')

    const newFilter = "chicken"

    store.dispatch(setFilters(newFilter))

    expect(getFoodItemsFilter(store.getState())).toBe(newFilter)
  })
})
