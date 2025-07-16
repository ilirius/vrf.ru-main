export type LocationType = {
  id: number
  name: string
  enabled: boolean
}

export type LocationStateType = {
  selectedLocation: LocationType | null
  allLocations: LocationType[]
  isMenuOpen: boolean
  autoDetect?: boolean
  isLoading: boolean
  errors: string
}

export const LOCATIONS = 'locations'
export type LOCATIONS = typeof LOCATIONS

export const GET_LOCATIONS = `${LOCATIONS}/getLocationsAction`
export type GET_LOCATIONS = typeof GET_LOCATIONS
export const GET_LOCATION_AUTO = `${LOCATIONS}/getLocationAutoAction`
export type GET_LOCATION_AUTO = typeof GET_LOCATION_AUTO

export const SET_LOCATION = `${LOCATIONS}/setLocationAction`
export type SET_LOCATION = typeof SET_LOCATION
