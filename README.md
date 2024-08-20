
# Food Truck Map Application

## Overview

This project is a web application that displays food trucks on a map based on user queries. It uses a combination of **React** for the frontend, **Redux Toolkit** for state management, **Django** for the backend API, and **SQLite** as the database.

The main feature of this application is the ability to filter and view food trucks in San Francisco based on various criteria such as location and food item filters.

## Project Structure

```
foodtruck/
├── server/              # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── ui/             # React frontend
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── App.tsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

- **Frontend:** React with TypeScript and Redux Toolkit
- **Backend:** Django with a RESTful API
- **Database:** SQLite
- **Testing:** Vitest for unit and integration tests (todo)

## Features

- Display food trucks on a map using Google Maps.
- Filter food trucks based on location and food items.
- Unit tests for Redux Toolkit slices and components. (todo)

## Try it with Docker
#### Remove existing containers and images with:
- ``docker compose down -v --rmi all``
#### Start:
- ``docker compose up``
#### Open in browser:
- Go to [http://localhost:5173/](http://localhost:5173/)


## Local Debugging Setup Instructions

### Prerequisites

- Node.js and npm
- Python 3.x and pip


### Backend Setup (Django)

1. **Clone the repository:**

   ```
   git clone https://github.com/LucasBonaudi/foodtruck.git
   ```

2. **Install dependencies:**

   ```
   pip install -r requirements.txt
   ```

3. **Apply migrations:**

   ```
   python manage.py migrate
   ```

4. **Fetch food truck data:**

   ```
   python manage.py import_food_trucks https://data.sfgov.org/resource/rqzj-sfat.json 
   ```

5. **Run the server:**

   ```
   python manage.py runserver
   ```

   The backend server will run at `http://localhost:8000/`.
*If you decide to run the server on another port please go to **ui/vite.config.ts** and modify **"/api"** proxy port*
### Frontend Setup (React)

1. **Navigate to the frontend directory:**

   ```
   cd ui
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Start the development server:**

   ```
   npm start
   ```

   The frontend application will run at `http://localhost:3000/`.

### Environment Variables

You can set environment variables for the frontend by creating a `.env` file in the `ui` directory. Example:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
*NOTE:  Google Maps API key is not necessary, you'll see a developer version of the map if its not in place.*
### Running Tests (WIP)

To run unit tests using Vitest, run the following command in the `ui` directory:

```
npm run test
```

This will execute all the test cases and display the results.
*Unit test are a work in progress*

## API Endpoints

The Django backend provides the following API endpoints:

- **GET /trucks/foodtrucks:** Fetches a list of food trucks with optional filters.

### Example Request:

```
GET /trucks/api/foodtrucks?fooditem=Tacos&ne_lat=37.7749&ne_lng=-122.4194&sw_lat=37.7049&sw_lng=-122.5094
```

### Example Response:

```json
[
	{
		"locationid": 1723891,
		"applicant": "Brazuca Grill",
		"location_description": "ARMSTRONG AVE: HAWES ST to INGALLS ST (1300 - 1399)",
		"address": "1315 ARMSTRONG AVE",
		"latitude": 37.723078757516,
		"longitude": -122.38752570401662,
		"foodItems": "Cold Truck: Sandwiches: Noodles:  Pre-packaged Snacks: Candy: Desserts Various Beverages"
	},
	{
		"locationid": 364218,
		"latitude": 37.78788969990609,
		"longitude": -122.40053532677749,
		"foodItems": "Hot Indian Chai (Tea)",
		"applicant": "The Chai Cart",
		"address": "79 NEW MONTGOMERY ST",
		"location_description": "NEW MONTGOMERY ST: AMBROSE BIERCE ST to MISSION ST (77 - 99)"
	}
]
```
