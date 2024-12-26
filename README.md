# vRv-assignment:
This project is a Dynamic Role-Based Access Control (RBAC) system designed to manage user permissions dynamically. 
It allows administrators to define roles with specific permissions and assign them to users, 
ensuring secure and efficient access management.

deployment link - https://tharunjp.github.io/VRV/ ( you can find login password below)

**Folder structure:**
src/
├── Components/
│   ├── Login.jsx           # Handles user login
│   ├── Read.jsx            # Displays user data based on permissions
│   ├── AddRole.jsx         # Manages creation of roles with permissions
├── Css/
│   ├── login.css           # Styles for Login page
│   ├── read.css            # Styles for User Management
│   ├── addRole.css         # Styles for Role Management
├── service/
│   ├── service.js          # Acts as a bridge between component and service, data manipulations will be handeled here.
├── constant/
│   ├── constant.js         # Contains static data //Usually this would be the api call layer which gets the data from db.
├── App.jsx                 # Root component that renders all features

**ADMIN CREDENTIALS:**                             **USER CREDENTIALS:**                            **Editor Credentials:**
email: 'jane.smith@example.com'             email: 'john.doe@example.com'                 email: 'liam.martinez@example.com'
password: 'hashedpassword456'               password: 'john2323121'                       password: 'liampack2932'

To check the details of other users, please navigate to the constants file located in the constants folder within the src directory. There, you'll find a list of all users and their respective passwords.

**LOGIC SUMMARY:**
The system consists of three main datasets: User Data, Role-Based Permissions, and Permission Definitions. Each dataset plays a crucial role in managing users, their roles, and their permissions. Below is a detailed summary of each dataset.
The is_active column indicates whether a user is active in the system. Users are not deleted directly; instead, is_active is set to 0 to mark them as inactive. Only users with is_active = 1 are displayed in the grid.

**User Data (userData):**
This dataset contains information about all users in the system. Each user has attributes such as a unique ID (id), name, email, and password. Users are assigned a role_id, which links them to a specific role in the permissionByRole table. Additional attributes like status, is_active, and timestamps (created_at, modified_at) track user activity and lifecycle. Fields such as created_by and modified_by indicate who managed the user record.

**Role-Based Permissions (permissionByRole):**
This dataset maps roles to specific permissions. Each role is identified by a unique role_id and a corresponding role_name. The access_id array links a role to specific actions defined in the permission table. For example:
Admin (role_id: 1) has access to all actions: read, edit, and delete.
User (role_id: 2) is limited to read operations.
Editor (role_id: 3) can perform read and edit actions.

**Permission Definitions (permission):**
This table defines the individual actions available in the system. Each action has a unique ID (permis_id) and a name (access_name), such as read, edit, or delete. These permissions are referenced in the permissionByRole table using their respective permis_id, ensuring consistency and scalability in permission management.

**How It Works:**
User Role Assignment: Each user’s role is determined by their role_id in the userData table.
Role Permission Mapping: The role_id links to the permissionByRole table to retrieve the relevant access_id array.
Permission Lookup: The access_id values are used to identify actions (permis_id) from the permission table.
Resulting Access: The system checks these permissions to control what actions a user can perfozzrm.
This architecture ensures a secure and scalable mechanism for managing roles and permissions effectively.


**Service Logic Overview:**
This file contains the core service logic for managing user data, roles, permissions, and user actions within the application. It includes functions that interact with the data from the constants (such as userData, permissionByRole, and permission), handling various operations like user validation, role assignments, updates, deletions, and access control. Below is a summary of each function, with an emphasis on how data manipulation occurs within the service layer:

**fetchAllData:**

Data Manipulation: Filters and returns only active users (is_active = 1) from the userData array. This function modifies the user data by checking and returning only those who are marked as active, ensuring the data presented is up-to-date.
Purpose: To display a list of users who are currently active.

**rolenameById:**

Data Manipulation: Takes a role_id and iterates over the permission array to check which permissions are associated with that role. It creates an object that dynamically maps each permission (like read, edit, delete) to true or false, indicating whether the role has access to it.
Purpose: To return a list of permissions associated with a specific role, allowing dynamic access control.

**deleteUser:**

Data Manipulation: Rather than deleting a user from the userData array, this function sets the is_active field to 0, marking the user as inactive. This approach allows the user record to be retained for historical or audit purposes.
Purpose: To mark a user as inactive (soft delete) without removing their data entirely from the system.


**updateUserData:**

Data Manipulation: Updates the attributes (name, email, status, and role) of a user in the userData array. It also validates the role by checking if the role exists in the permissionByRole array. If valid, the user's role is updated with the corresponding role_id; if not, an error message is returned.
Purpose: To update user information and ensure data integrity by validating the role before applying the changes.

**userValidate:**

Data Manipulation: Checks if the provided username and password match any record in the userData array. If the credentials are correct, the user data is returned; otherwise, it returns false.
Purpose: To validate user login credentials and ensure that only authorized users can access the system.

**findAccessId:**

Data Manipulation: Iterates through the permissionByRole array to find the access_id associated with the given role_id. This access_id is then used to determine which specific actions (permissions) the role has access to.
Purpose: To find and return the permissions associated with a given role, enabling role-based access control.

**addRole:**

Data Manipulation: Adds a new role with the specified role_name and associated access (permissions) to the permissionByRole array. It dynamically increments the role_id to ensure each role has a unique identifier.
Purpose: To dynamically add new roles and assign corresponding permissions to them, enhancing the flexibility of role management.

**Summary:**
This file defines the main service functions that manage users, roles, permissions, and user actions. The data manipulation processes occur in the form of filtering, updating, adding, and marking data as inactive, rather than performing direct deletions. These operations ensure that the data remains consistent, secure, and up-to-date while allowing flexibility in managing users and roles dynamically. By handling data in this manner, the system can enforce role-based access control, validate user credentials, and manage user information effectively.



//I hope this overview clarifies the system’s process and logic. It’s designed for efficient user and permission management. Let me know if you need further details!//



