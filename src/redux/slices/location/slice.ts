import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LOCATIONS, LocationStateType, LocationType } from './types'

import { FetchedLocation } from '@/redux/api/fetchLocation'

const locationInitialState: LocationStateType = {
  selectedLocation: null,
  allLocations: [],
  isMenuOpen: false,
  isLoading: true,
  errors: ''
}

export const locationSlice = createSlice({
  name: LOCATIONS,
  initialState: locationInitialState,
  reducers: {
    disableAutoDetect: (state: LocationStateType) => {
      state.autoDetect = false
    },
    setLocationAction: (
      state: LocationStateType,
      action: PayloadAction<LocationType | null>
    ) => {
      state.autoDetect = false
      state.selectedLocation = action.payload
    },
    setIsMenuOpenAction: (
      state: LocationStateType,
      action: PayloadAction<boolean>
    ) => {
      state.isMenuOpen = action.payload
    },
    getLocationsAction: (state: LocationStateType) => {
      state.isLoading = true
      state.errors = ''
    },
    getLocationsSuccessAction: (
      state: LocationStateType,
      { payload: locations }: PayloadAction<LocationType[]>
    ) => {
      state.isLoading = false
      state.allLocations = locations.filter(location => location.enabled)
    },
    getLocationsErrorAction: (
      state: LocationStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.errors = error
    },
    getLocationAutoAction: (state: LocationStateType) => {
      state.autoDetect = true
      state.isLoading = true
      state.errors = ''
    },
    getLocationAutoSuccessAction: (
      state: LocationStateType,
      { payload: locations }: PayloadAction<FetchedLocation[]>
    ) => {
      state.isLoading = false
      const newLocation = state.allLocations.find(
        location => locations[0].geoname_id === location.id
      )
      if (newLocation) {
        state.selectedLocation = newLocation
      } else {
        state.selectedLocation = null
      }
    },
    getLocationAutoErrorAction: (
      state: LocationStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.errors = error
    }
  }
})

export const {
  disableAutoDetect,
  setLocationAction,
  setIsMenuOpenAction,
  getLocationsAction,
  getLocationsSuccessAction,
  getLocationsErrorAction,
  getLocationAutoErrorAction,
  getLocationAutoSuccessAction,
  getLocationAutoAction
} = locationSlice.actions
export default locationSlice.reducer
