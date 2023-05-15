import { Destination } from "./destination"
import { User } from "../components/RoleDropdown"

export interface CentralListProps {
    centralList: Destination[]
    setCentralList: (newCentralList: Destination[]) => void
    sharedList: Destination[]
    setSharedList: (newCentralList: Destination[]) => void
}

export interface UserListProps {
    centralList: Destination[]
    setCentralList: (newCentralList: Destination[]) => void
    itinerary: Destination[]
    setItinerary: (newItinerary: Destination[]) => void
    currentUser: User
}
