# Provisional Name: Ecommerce Backend

This project serves as the backend for an ecommerce site built using Node.js with Express. It enables users to register, log in, log out, manage their carts, make purchases, and view their purchase history.

I will keep working on it as I continue my journey toward becoming a Full Stack developer.


## Features

- **User Authentication:** Allows users to register, log in, and log out securely, passwords are encrypted by the Bcrypt algorithm.
- **Shopping Cart:** Users can add products to their carts and manage their cart items.
- **Purchase History:** Enables users to view a history of their past purchases.

## Future Plans: 
### Scraper
- Implementing a scraper using Puppeteer to add more products.
- Utilizing the scraper to create a page for users to compare product prices from various websites.

### Creation of a private API.
- Establishing a JSON API protected using JWT

### Integration with a React frontend.
- In the near future, this app will be connected to a front end with React and NextJS

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) installed on your system.

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Aramendiander/proyecto-backend.git
   
2. Rename the .env.example file and set up the data as you prefer.
3. For default, the project runs on the database set on the db/init folder. This creates the database and inserts some placeholder data. Feel free to make any change you need in there.
4. Run docker compose up to start every service
   ```bash
   docker-compose up
   ```
   This will start the services used for this project, as of now are:
     - Node.js
     - PostgreSQL
     - pgAdmin
   pgAdmin's default port is set to 8888..

## Comments

This project is made to learn, but feel free to make comments on how to improve.

## License

The project licensed under the GNU license.

