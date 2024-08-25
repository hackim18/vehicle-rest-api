# Vehicle REST API

This is a RESTful API for managing vehicle data including brands, types, models, and pricelists. It supports CRUD operations, filtering, pagination, and authentication using JWT. The API is built using Node.js, PostgreSQL as the database, and Sequelize as the ORM (Object-Relational Mapping) tool.

## Deployment

The API is deployed at [https://api-vehicle.hackimtech.com/](https://api-vehicle.hackimtech.com/).

## Installation

To install and set up the project, follow these steps:

### Clone the repository:

```bash
git clone https://github.com/hackim18/vehicle-rest-api.git
cd vehicle-rest-api
```

### Install dependencies:

```bash
npm install
```

### Set up environment variables

Create a `.env` file at the root directory with the following contents:

```bash
PORT=3000
JWT_SECRET=your_jwt_secret
```

## Database Setup

To set up the PostgreSQL database, you can use the following commands in your terminal:

### Create the database:

```bash
npm run db:create
```

### Run migrations to set up the schema:

```bash
npm run db:migrate
```

### Seed the database with initial data:

```bash
npm run db:seed
```

### To reset the database (drop, create, migrate, and seed), run:

```bash
npm run db:reset
```

Here is the list of available database-related commands in the `package.json`:

```json
"scripts": {
   "db:create": "npx sequelize db:create",
   "db:drop": "npx sequelize db:drop",
   "db:migrate": "npx sequelize db:migrate",
   "db:migrate:undo": "npx sequelize db:migrate:undo:all",
   "db:seed": "npx sequelize db:seed:all",
   "db:seed:undo": "npx sequelize db:seed:undo:all",
   "db:reset": "npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed"
}
```

## Postman Collection

You can find the Postman Collection for this API [here](https://api.postman.com/collections/33199697-3180e540-ea2d-46b1-b440-15a46a7f9478?access_key=PMAT-01J64N3NHGY3SGT919C5EB1T69).

This collection includes examples of all available API endpoints and makes it easier to test and interact with the API.

## API Endpoints

### Authentication

#### POST /user/login

Logs in a user and returns a JWT token.

Request body:

```json
{
  "name": "username",
  "password": "userpassword"
}
```

Response:

```json
{
  "access_token": "jwt_token"
}
```

#### POST /user/register

Registers a new user.

Request body:

```json
{
  "name": "username",
  "password": "userpassword"
}
```

Response:

```json
{
  "message": "Registration successful",
  "name": "username"
}
```

### Vehicle Brands

#### GET /vehicle/brands

Fetches all vehicle brands with optional pagination and filtering by brand name or ID.

Query parameters:

- `limit` (optional): Number of items per page.
- `offset` (optional): Number of items to skip.
- `brand_id` (optional): Filter by brand ID.
- `brand_name` (optional): Filter by brand name.

Response:

```json
{
  "metadata": {
    "total": 100,
    "limit": 10,
    "offset": 0
  },
  "data": [
    {
      "name": "Brand Name",
      "types": [
        {
          "name": "Type Name",
          "models": [
            {
              "name": "Model Name",
              "pricelists": [
                {
                  "code": "P001",
                  "price": 10000,
                  "year": {
                    "year": 2023
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

#### POST /vehicle/brands

Creates a new vehicle brand. Requires authorization.

Request body:

```json
{
  "name": "Brand Name"
}
```

Response:

```json
{
  "id": 1,
  "name": "Brand Name"
}
```

#### GET /vehicle/brands/:id

Fetches a vehicle brand by ID.

Response:

```json
{
  "name": "Brand Name",
  "types": [...]
}
```

#### PATCH /vehicle/brands/:id

Updates a vehicle brand by ID. Requires authorization.

Request body:

```json
{
  "name": "Updated Brand Name"
}
```

#### DELETE /vehicle/brands/:id

Deletes a vehicle brand by ID. Requires authorization.

Response:

```json
{
  "message": "Brand deleted"
}
```

### Vehicle Types

#### GET /vehicle/types

Fetches all vehicle types with optional pagination and filtering by brand ID or name.

Query parameters:

- `limit` (optional): Number of items per page.
- `offset` (optional): Number of items to skip.
- `brand_id` (optional): Filter by brand ID.
- `brand_name` (optional): Filter by brand name.

Response:

```json
{
  "metadata": {
    "total": 100,
    "limit": 10,
    "offset": 0
  },
  "data": [
    {
      "name": "Type Name",
      "brand": {
        "name": "Brand Name"
      },
      "models": [
        ...
      ]
    }
  ]
}
```

#### POST /vehicle/types

Creates a new vehicle type. Requires authorization.

Request body:

```json
{
  "name": "Type Name",
  "brand_id": 1
}
```

Response:

```json
{
  "id": 1,
  "name": "Type Name",
  "brand_id": 1
}
```

#### GET /vehicle/types/:id

Fetches a vehicle type by ID.

Response:

```json
{
  "name": "Type Name",
  "brand": {
    "name": "Brand Name"
  },
  "models": [...]
}
```

#### PATCH /vehicle/types/:id

Updates a vehicle type by ID. Requires authorization.

Request body:

```json
{
  "name": "Updated Type Name",
  "brand_id": 1
}
```

#### DELETE /vehicle/types/:id

Deletes a vehicle type by ID. Requires authorization.

Response:

```json
{
  "message": "Type deleted"
}
```

## Middleware

- `authentication`: Protects routes by ensuring the user is authenticated via JWT.
- `authorization`: Ensures the user has the necessary permissions (e.g., admin) to access certain routes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
