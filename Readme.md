# Maxpot - Full Stack MERN eCommerce

MAXPOT (Maximum Potential) is a fully functional Ecommerce store built with MERN Stack and Redux for Mixed Martial Arts Products.

## [Visit Site](https://maxpot.heroku.com/)

![Overview](https://i.ibb.co/zNch5jz/1.png)

## App Info

- Register new Accounts
- Shopping cart with indicator
- Place the Order with checkout process
- Including Shipping Address
- Products Pagination
- Products search from navbar
- User profile that can be edited with order details
- Admin Control to delete or Edit Users
- Admin Control to manage product
- Admin Control to deliver products
- Contact Form

## Key Technical Details

- A full stack Ecommerce website built with the frontend including React, Redux & Material-UI.
- The Backend have a custom REST API created with Node.js, Express and mongoose schemas of MongoDB.
- For Users authentication of checkout process and Admin Authorization, JSON Web Tokens (JWT) are used.

## Libraries and Frameworks - Dependencies & DevDependencies

### Backend:

- express (Web Framework to handle routing)
- bcryptjs (Hashing our password to make them secure)
- jsonwebtoken (JWT Authentication to access protective routes on the server)
- express-validator (to validator data in the body like email)
- mongoose (abstraction layer for our DB and to create models)
- nodemon (DevDependency that allow us to keep watching server side changes)
- concurrently (DevDependency that allow us to run backend and frondend at the same time)
- morgan (HTTP request logger middleware for node.js)
- multer (node.js middleware for handling multipart/form-data, which is primarily used for uploading files.)

### Frontend:

- create-react-app (to install the biolerplate of react)
- axios (library to fetch the http requests and the Custom API)
- @material-ui/core (React UI framework)
- redux (For global state management)
- redux-thunk (to run redux async)

All these dependencies are installed by the Node Package Manager (NPM)

## Database Setup

- For database, I used a MongoDB which is a NoSQL Database (Document Database having JSON format).
- For easy setup, I used MongoDB Atlas which is a cloud database.

## Hosting

The application is hosted on Heroku with heroku cli.

## Usage

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
