# Employee Management System - Setup Guide

## Prerequisites
- Java 17 (updated from Java 21)
- Node.js (v16 or higher)
- MySQL Server
- Maven (or use included Maven wrapper)

## Backend Setup (Spring Boot)

### 1. Database Setup
1. Install MySQL and start the service
2. Create a database named `fullstack`:
   ```sql
   CREATE DATABASE fullstack;
   ```
3. Update `springbootsrm/src/main/resources/application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 2. Run Backend
```bash
cd springbootsrm
# Using Maven wrapper (recommended)
./mvnw.cmd spring-boot:run
# OR if Maven is installed globally
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`

## Frontend Setup (React)

### 1. Install Dependencies
```bash
cd frontend/Employee
npm install
```

### 2. Run Frontend
```bash
npm run dev
```
The frontend will start on `http://localhost:5173`

## Testing the Application

1. Open `http://localhost:5173` in your browser
2. You should see the Employee Management System
3. Try adding a new employee using the "Add User" button
4. View, edit, and delete employees from the home page

## API Endpoints

- `GET /employee` - Get all employees
- `POST /employee` - Create new employee
- `GET /employee/{id}` - Get employee by ID
- `PUT /employee/{id}` - Update employee
- `DELETE /employee/{id}` - Delete employee

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure the `@CrossOrigin` annotation in `EmployeeController.java` matches your frontend URL.

### Database Connection Issues
- Verify MySQL is running
- Check database name and credentials in `application.properties`
- Ensure the `fullstack` database exists

### Port Conflicts
- Backend default: 8080
- Frontend default: 5173
- Change ports in respective configuration files if needed