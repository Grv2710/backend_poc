# Express-Mongoose API

This project is an API built using Express.js and Mongoose, which interfaces with a MongoDB database. It allows you to perform CRUD operations on a collection with a schema that includes a `pocName` and a `doi` (Date of Inclusion).

## Project Structure

- `model/data.js`: Defines the Mongoose schema and model for the data collection.
- `routes/data.js`: Contains the API routes for interacting with the data collection.

## Schema

The Mongoose schema defined in `model/data.js` includes:
- `pocName`: A required string field, with a minimum length of 3 characters, stored in lowercase, and trimmed of whitespace.
- `doi`: A date field with a default value set to the current date.

## API Endpoints

### GET /api/data

Fetches all data documents. Supports query parameters for filtering by `startDate`, `endDate`, and other fields.

**Query Parameters:**
- `startDate`: Start date for filtering `doi`.
- `endDate`: End date for filtering `doi`.
- Other query parameters to filter data based on field values.

### GET /api/data/pocNames

Fetches all unique `pocName` values from the data collection.

### GET /api/data/pocName-counts

Fetches the count of documents for each `pocName`.

### GET /api/data/:id

Fetch a data document by ID.

### POST /api/data

Creates a new data document. The request body must include a `pocName` with at least 3 characters.

### PUT /api/data/:id

Updates a data document by ID. The request body should contain the fields to be updated.

### DELETE /api/data

Deletes multiple data documents based on query parameters.

## Usage

1. Ensure MongoDB is running.
2. Install dependencies:
   ```sh
   npm install


## Note

This backend is developed to handle many POCs (Proof of Concepts) within a single backend using unified routes. This design eliminates the need to develop new backend services for each new POC. The `strict: false` option in the schema allows for additional fields in documents that are not defined in the schema. This flexibility means that for every POC, the consistency of fields must be carefully managed when creating, updating, deleting, or querying data. Ensuring field consistency across POCs is crucial to maintaining data integrity and avoiding potential issues with data handling.
