# ShopSphere

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-bcrypt@5.0.0-yellowgreen.svg)](https://www.npmjs.com/package/bcrypt)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-cloudinary@1.40.0-sandybrown.svg)](https://www.npmjs.com/package/cloudinary)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-connect--session--sequelize@7.0.4-lightblue.svg)](https://www.npmjs.com/package/connect-session-sequelize)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-dotenv@8.2.0-lightpink.svg)](https://www.npmjs.com/package/dotenv)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-express@4.17.1-salmon.svg)](https://www.npmjs.com/package/express)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-express--handlebars@7.1.2-darkorange.svg)](https://www.npmjs.com/package/express-handlebars)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-express--session@1.17.3-skyblue.svg)](https://www.npmjs.com/package/express-session)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-multer@1.4.5--lts.1-turquoise.svg)](https://www.npmjs.com/package/multer)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-mysql2@2.2.1-lightcoral.svg)](https://www.npmjs.com/package/mysql2)
[![NPM-Package:](https://img.shields.io/badge/NPM_Package-sequelize@6.3.5-lightgreen.svg)](https://www.npmjs.com/package/sequelize)

## Description

Welcome to ShopSphere, Our E-Commerce Platform, a next-generation online marketplace tailored for both buyers and sellers. Built with a focus on user experience and modern aesthetics, our platform offers a seamless experience for both sellers looking to list their products and buyers seeking to make a purchase.

### Features

`Modern UI/UX:` Crafted with a focus on modern design paradigms, the platform provides an intuitive and visually appealing interface.

`Dynamic Listings:` Sellers can easily upload product images, set prices, and manage their inventory.

`Secure Authentication:` Enhanced security protocols ensure user data is protected and encrypted.

`Fast Checkout Process:` Buyers enjoy a streamlined checkout process, enhancing their shopping experience.

`Member-exclusive Deals:` Registered members get access to special deals and discounts.

`Detailed Product Views:` Each product is showcased with detailed descriptions and high-resolution images.

`Responsive Design:` The platform is designed to be responsive, ensuring a consistent experience across all device types.

## Table of Contents

- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
  - [Installation & Local Development](#installation-&-local-development)
- [Usage](#usage)
  - [Sellers](#for-sellers)
  - [Buyers](#for-buyers)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)
- [Acknowledgements](#acknowledgements)
- [Questions](#questions)

## Live Demo

### Experience our platform live on Heroku: [ShopSphere](https://shopsphere-app-86b18455dad3.herokuapp.com/)

## Getting Started

### Installation & Local Development

To clone the repository, navigate to the directory you want to clone the repository into.

Then, run the following command.

```bash
git clone 'git@github.com:Verouge/ShopSphere.git'
```

- Navigate to project directory: `cd project-directory`
- Install required packages: `npm install`
- Start the local server: `npm start`
- Open a browser and go to http://localhost:3001.

## Usage

### For Sellers:

- Register/Login into your account.
- Navigate to the seller dashboard.
- List, edit, or remove products with ease.

### For Buyers:

- Browse the product listings.
- Add products to the cart or wishlist.
- Proceed to checkout, fill in details, and complete the purchase.

## Contributing

Please contact us to add your contributions

## License

This project is licensed under the MIT license.

```
Copyright <2023> <Brandon Zhang>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Credits

- Alexander Duncan
- Baz Rahimi
- Brandon Zhang

## Acknowledgments

This project employs an array of technologies and tools to offer a seamless e-commerce experience:

- **bcrypt**: A library to help with hashing passwords, which is crucial for ensuring user security and data privacy. It offers methods to hash and verify passwords, providing a layer of protection against unauthorized access. [View on npm](https://www.npmjs.com/package/bcrypt)

- **Cloudinary**: A cloud service that offers solutions to an application's entire image management pipeline. It's used to upload, store, manipulate, and deliver images and video for the e-commerce platform. [Official website](https://cloudinary.com/)

- **Connect-Session-Sequelize**: A SQL session store using Sequelize. This package is used to store session data on the server-side, allowing for persistent and scalable sessions. [View on npm](https://www.npmjs.com/package/connect-session-sequelize)

- **Dotenv**: This zero-dependency module loads environment variables from a `.env` file into `process.env`, which is essential for managing application configuration and sensitive credentials. [View on npm](https://www.npmjs.com/package/dotenv)

- **Express**: A fast, minimal, and flexible Node.js web application framework. It provides a robust set of features for web and mobile applications, simplifying tasks like routing, middleware integration, and API creation. [Official website](https://expressjs.com/)

- **Express-Handlebars**: A view engine for Express which uses the Handlebars templating language. It aids in rendering dynamic views and content on the e-commerce platform. [View on npm](https://www.npmjs.com/package/express-handlebars)

- **Express-Session**: This module directly integrates with Express and provides session management capabilities. It's used to store session data and maintain state between requests, essential for features like user logins. [View on npm](https://www.npmjs.com/package/express-session)

- **Multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files. In an e-commerce setting, it aids in tasks like product image uploads. [View on npm](https://www.npmjs.com/package/multer)

- **MySQL2**: An npm package that provides MySQL connection for Express. Serving as the project's relational database system, MySQL is both robust and efficient, underpinning our data storage solution. [View on npm](https://www.npmjs.com/package/mysql2)

- **Sequelize**: A promise-based Node.js ORM that supports flexible model definition and various DBMS dialects. It allows the application to design and interact with SQL databases effortlessly. [Official website](https://sequelize.org/)

---

These acknowledgments highlight the purpose and significance of each technology used in the project. They are not endorsements of the technologies and tools.

## Questions

If you have any questions, please feel free to contact me via email or on GitHub.

Email: branola1998628@gmail.com

GitHub: [verouge](https://github.com/verouge)
