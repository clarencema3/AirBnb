# themeNB

themeNb is a full stack application, inspired by [Airbnb]. Users are able to post listings of lodgings for vacation rentals.
<p>

[Click here to visit themeNB live site][themeNb]
</p>

## Wiki:
[Schema][Schema]

## This project is built with:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## MVP Core Features
### Spots
* Users can view spots of any user, including their own
* Users can create a Spot
* Users can update their existing Spot
* Users can delete their Spot

### Reviews
* Users can read all reviews of a Spot
* Users can create a review for a Spot they do not own
* Users can edit their review
* Users can delete their review



## Landing Page
Users are currently able to access the login page, signup page, and create a spot/review once logged in. There is also a demo user button available, after clicking the profile button on the top right, if users wish to test features without signing up.
![LandingPage](/assets/landing-page.png)

## Running the project locally
1. Clone this repository:

   `
   https://github.com/clarencema3/AirBnb
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

    `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`


## To do List
 * Create a 'Manage Reviews page where users can easily navigate to their reviews and update/delete them.

 ## Contact Information
* clarencema@live.com
* [LinkedIn][LinkedIn]






<!-- resource links -->
[Airbnb]: https://www.airbnb.com/
[themeNb]: https://themenb.onrender.com/
[Schema]: https://github.com/clarencema3/AirBnb/wiki/Schema
[LinkedIn]: https://www.linkedin.com/in/clarence-ma-93bb45258/
