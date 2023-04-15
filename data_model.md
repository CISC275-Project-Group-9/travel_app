# Data Model

Notes: 
- The specific roles (permissions) User, Admin, and Super have been renamed Basic, Staff, and Faculty. 
- Behind-the-scenes data:
  - List of “Basic” Users: list of all users with the “Basic” Role (formerly called User). Editable by Staff and Faculty.
  - List of destinations: list of all destination options (to be mapped to the UI list to be displayed)



# Interfaces (property (type))
- Destination (the drag and drop item)
    - Name (str)
      - Name of the travel destination
    - Description (str)
      - Description of the destination
    - Image (str)
      - Image of the destination
    - Location (str)
      - State and city of the destination
    - Days (int)
      - The amount of days the user will stay
    - Cost (int)
      - Price to attend
    - Activities (list[str])
      - Activities at said destination

- UserType (type of user)
    - Role (Role)
      - The role of the user
      - Basic, Staff, Faculty
      
- Role
  - Name (str)
    - Faculty (Super), Staff (admin), Basic (User)
  - Priority (num)
    - 1,2,3, depending on the role’s priority

# User Interfaces
- Dropdown Role Select
  - Dropdown list
  - Role choices
    - Faculty (Super)
    - Staff (Admin)
    - Basic (User)
  - Must have access to list of all Basic users
  
- Lists of Destinations
  - Central list
    - Has every destination option (the drag and drop items)
    - Needs access to list of destinations
    - Must be role-responsive
      - Only Faculty (super) can add, delete, and filter destinations

  - Staff (Admin) list
    - Needs access to list of destinations
    - Destinations can be modified and reviewed here before being added to the central list.
    - Must be role-responsive
      - Only Faculty (super) and Staff (admin) can edit
    - Must update Central list
      - When items are edited in this list and saved, the items in the central list are updated.
      
  - Basic (User) list
    - Needs access to list of destinations
    - Specially for the specified “Basic” user
      - Only they can edit/filter (by at least 2 fields)
    - Only one of these lists per user
    - Must have access to the master list of Basic users


