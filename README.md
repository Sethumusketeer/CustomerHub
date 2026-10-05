# CustomerHub

CustomerHub is a full-stack customer management application that I built to work with Angular on the frontend and .NET Web API on the backend.

The main purpose of this project is to practice and demonstrate frontend development with Angular while using my existing .NET backend experience.

## Technologies Used

### Frontend

- Angular 19
- TypeScript
- HTML / CSS
- Reactive Forms
- Angular Routing
- HttpClient
- HTTP Interceptor
- Route Guards

### Backend

- .NET 8 Web API
- C#
- Entity Framework Core
- SQL Server
- JWT Authentication
- Role-Based Authorization
- Repository Pattern
- Service Layer
- Swagger

## What the Application Does

The application provides basic customer and user management.

### Customer Management

- View all customers
- View customer details
- Add a customer
- Edit a customer
- Delete a customer
- Form validation
- Loading and saving states

### User Management

Admin users can:

- View application users
- Create new users
- Assign User or Admin roles

### Authentication

The application uses JWT authentication.

After login:

- The JWT token is stored in the browser
- Angular sends the token with API requests
- Protected routes are handled using Angular route guards
- The backend validates the JWT
- Admin operations are protected using role-based authorization

The backend is responsible for the actual API security.

## Project Structure

```text
CustomerHub
│
├── frontend
│   └── customerhub-web
│
├── backend
│   └── CustomerHub.Api
│
├── .gitignore
└── README.md
```

## Angular Structure

The Angular application contains separate components for the main application features.

```text
src/app
│
├── customer
├── customer-add
├── customer-card
├── customer-details
├── customer-edit
├── login
├── users
├── user-create-modal
├── shared
├── interceptors
│
├── auth.service.ts
├── auth.guard.ts
├── admin.guard.ts
├── customer.service.ts
├── user.service.ts
└── app.routes.ts
```

## Backend Structure

The backend follows a simple layered structure.

```text
CustomerHub.Api
│
├── Controllers
├── Services
├── Repositories
├── Models
├── Data
└── Migrations
```

The API uses Entity Framework Core to communicate with SQL Server.

## API Endpoints

### Authentication

```text
POST /api/auth/login
```

### Customers

```text
GET    /api/customers
GET    /api/customers/{id}
POST   /api/customers
PUT    /api/customers/{id}
DELETE /api/customers/{id}
```

### Users

```text
GET  /api/users
POST /api/users
```

## Running the Project Locally

### Backend

Go to:

```text
backend/CustomerHub.Api/CustomerHub.Api
```

The application uses .NET User Secrets for local database and JWT configuration.

Run:

```powershell
dotnet restore
dotnet run
```

Swagger can be accessed using the HTTPS URL shown when the API starts.

### Frontend

Go to:

```text
frontend/customerhub-web
```

Install the packages:

```powershell
npm install
```

Start Angular:

```powershell
ng serve
```

Then open:

```text
http://localhost:4200
```

## Authentication

The application currently has two roles:

- Admin
- User

Admin users can manage customers and application users.

Regular users can view customers but cannot perform admin operations such as adding, editing, or deleting customers.

## What I Practiced With This Project

While building this application, I worked with:

- Angular standalone components
- Angular routing and route parameters
- Reactive forms
- Form validation
- Parent-child component communication
- Angular services and dependency injection
- HttpClient and Observables
- HTTP interceptors
- Route guards
- JWT authentication
- Role-based authorization
- .NET Web API
- Entity Framework Core
- SQL Server
- Repository and service patterns
- Async CRUD operations

## Future Improvements

Some improvements I plan to add later:

- Deploy the application to the cloud
- Add automated tests
- Add CI/CD
- Improve global error handling
- Add refresh-token support
- Add application logging
