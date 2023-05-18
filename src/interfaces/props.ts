import { Destination } from "./destination"
import { User } from "../interfaces/user"

export interface CentralListProps {
    centralList: Destination[]
    setCentralList: (newCentralList: Destination[]) => void
    sharedList: Destination[]
    setSharedList: (newCentralList: Destination[]) => void
}

export interface UserListProps {
    centralList: Destination[]
    setCentralList: (newCentralList: Destination[]) => void
    itinerary1: Destination[]
    itinerary2: Destination[]
    setItinerary: (newItinerary: Destination[]) => void
    currentUser: User
    setCurrentUser: (newUser: User) => void
    users: User[]
    setUsers: (newUsers: User[]) => void
}
