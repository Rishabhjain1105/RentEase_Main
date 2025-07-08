# RentEase API Documentation

## User Routes

### 1. Register User
**Endpoint:** `/api/v1/users/register`

**Method:** `POST`

**Request Body:**
```json
{
  "role": "tenant",
  "username": "john_doe",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "address": "123 Main St",
  "aadharCardNumber": "1234-5678-9012",
  "password": "password123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "userId",
    "role": "tenant",
    "username": "john_doe",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "address": "123 Main St",
    "aadharCardNumber": "1234-5678-9012"
  },
  "message": "User registered successfully",
  "success": true
}
```

---

### 2. Login User
**Endpoint:** `/api/v1/users/login`

**Method:** `POST`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "userId",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "accessToken": "accessToken",
    "refreshToken": "refreshToken"
  },
  "message": "User logged in successfully",
  "success": true
}
```

---

## Property Routes

### 1. Add New Property
**Endpoint:** `/api/v1/properties/add-new-property`

**Method:** `POST`

**Request Body:**
```json
{
  "title": "Luxury Apartment",
  "description": "A beautiful apartment in the city center.",
  "street": "123 Main St",
  "city": "Metropolis",
  "state": "NY",
  "pincode": "12345",
  "landmark": "Near Central Park",
  "amenities": ["WiFi", "Parking"],
  "propertyType": "Apartment"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "propertyId",
    "title": "Luxury Apartment",
    "description": "A beautiful apartment in the city center."
  },
  "message": "New property added successfully",
  "success": true
}
```

---

## Room Routes

### 1. Add New Room
**Endpoint:** `/api/v1/rooms/new-room`

**Method:** `POST`

**Request Body:**
```json
{
  "roomNumber": "101",
  "roomType": "Single",
  "tenantType": "Student",
  "floor": 1,
  "rentAmount": 500,
  "maxOccupancy": 1,
  "propertyId": "propertyId"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "roomId",
    "roomNumber": "101",
    "roomType": "Single",
    "rentAmount": 500
  },
  "message": "Room created successfully",
  "success": true
}
```

---

For more details on other routes and controllers, please refer to the respective files in the `Backend/src/routes` and `Backend/src/controllers` directories.