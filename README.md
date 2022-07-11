<div align=center>
<img src='./client/src/Images/logobackgroundgray.jpg'>
</div>
Welcome to Torna. Torna is a web app where you can create customizable photo albums and share them with the people you want.


<div align='center'>
<img src='https://i.ibb.co/yg3MDpt/demo.png'/>
</div>
Here you can see a demo of <a href="https://www.youtube.com/watch?v=BEH7flzC24M&ab_channel=XaviFortuny"> Torna </a> to see how it works.


# Tech Stack
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" /></a>
<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" /></a>
<a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored.svg" width="36" height="36" alt="Express" /></a>
<a href="https://firebase.google.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/firebase-colored.svg" width="36" height="36" alt="Firebase" /></a>
<a href="https://www.prisma.io/">   <img src="https://avatars.githubusercontent.com/u/17219288?s=280&v=4" alt="Prisma Logo" width="36" height="36"/></a>
<a href="https://www.postgresql.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/postgresql-colored.svg" width="36" height="36" alt="PostgreSQL" /></a>
<a href="https://www.heroku.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/heroku-colored.svg" width="36" height="36" alt="Heroku" /></a>

# How to use it?
TORNA's frontend is deployed on Vercel. Check it now: https://torna.vercel.app/

If you want to check the code follow these steps:
1- fork this repo and clone it on your local machine. 
```bash
git clone https://github.com/Torna-Team/Torna.git
```
2- run npm install on the root folder.
```bash
npm install
```
3- Create a .env file in client.
./client/.env
```bash
REACT_APP_CLOUDINARY_URL='YOUR_CLOUDINARY_URL_KEY'
REACT_APP_CLOUDURL='YOUR_CLOUDINARY_URL'
REACT_APP_GOOGLEAPI='GOOGLE_API_KEY_FONTS'
REACT_APP_APIKEY='FIREBASE_KEY'
REACT_APP_AUTHDOMAIN='FIREBASE_KEY'
REACT_APP_PROJECTID='FIREBASE_KEY'
REACT_APP_STORAGEBUCKET='FIREBASE_KEY'
REACT_APP_MESSAGINGSENDERID='FIREBASE_KEY'
REACT_APP_APPID='FIREBASE_KEY'
REACT_APP_MEASUREMENTID='FIREBASE_KEY'
REACT_APP_GIPHY_KEY='YOUR_GIPHY_KEY'
```
Note: Firebase keys come together with the same names on their website.
Torna's backend is deployed in Heroku, so you don't need to worry about the database. Alternatively, if you want to create your database, you will need to create a Prisma account, install Prisma/@client and link it with PostgreSQL. Then you will need to create .env in prisma's folder.
./app/prisma/.env
```bash
REACT_APP_DATABASE_URL='YOUR_PRISMA_KEY'
```
4- Initialize the backend.
```bash
cd app
npm start
```
5- Initialize the frontend.
```bash
cd client
npm start
```
Once you finish, you will see the app on your browser.
<!-- 
# Generating data
Once that is done, you are ready to populate the database. Register a new user through the app interface. You will need to provide with a first name, a last name, an e-mail and a password. All info can be, of course, fake. You can also sign in with Google Auth. 
Once this is done, you should be able to see an empty profile. Click on create new album and let your creative do the rest. You will be able to share the album with people you want and keep editing it as many times you desire. 

# What can be improved?
There's always things to do! We would like to implement Stripe for premium users. And be able to edit the album with more than one user at the same time.
-->
# Authors
Irene Cagnoni - [Github](https://github.com/irenecgn) - [Linkedin](https://www.linkedin.com/in/irenecagnoni/) 

Nacho Coll - [Github](https://github.com/Nachcoll) - [Linkedin](https://www.linkedin.com/in/nachcoll)

Joan Marc Domènech - [Github](https://github.com/Mortyrise) - [Linkedin](https://www.linkedin.com/in/joanmarc-domenech/)

Xavier Fortuny - [Github](https://github.com/xfortunyi) - [Linkedin](https://www.linkedin.com/in/xavifortuny/)
