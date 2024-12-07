# vRv-assignment:
This project is a Dynamic Role-Based Access Control (RBAC) system designed to manage user permissions dynamically. 
It allows administrators to define roles with specific permissions and assign them to users, 
ensuring secure and efficient access management.

Folder structure:
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

ADMIN CREDENTIALS:                             USER CREDENTIALS:                             Editor Credentials:
email: 'jane.smith@example.com'             email: 'john.doe@example.com'                 email: 'liam.martinez@example.com'
password: 'hashedpassword456'               password: 'john2323121'                       password: 'liampack2932'
