# Torna
Welcome to Torna. This is a web app where you can create your own customisable photo albums and share it with the people you want.




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
Frontend deployed on Vercel. Check it now: https://torna.vercel.app/

Otherwise, if you want to check the code, fork this repo and clone it on your local machine. Once in the folder, run npm install on the root folder, and also on /app and /client.
Make sure Nodemon is installed globaly, and run nodemon index.js on /app, to initialize the server.
To initialize the client, run npm start from the /client folder.
Once that is done and you see the app on your browser.

# Generating data
For now, Torna's backend is deployed in Heroku so you don't need to be worry about the database. As an alternative, if you want to create your own database, you will need to create a Prisma account, install Prisma/@client and link it with a PostgreSQL. 

Once that is done, you are ready to populate the database. Register a new user through the app interface. You will need to provide with a first name, a last name, an e-mail and a password. All info can be, of course, fake. You can also sign in with Google Auth. 

Once this is done, you should be able to see an empty profile. Click on create new album and let your creative do the rest. You will be able to share the album with people you want and keep editing it as many times you desire. 

# What can be improved?
There's always things to do! We would like to implement Stripe for premium users. And be able to edit the album with more than one user at the same time.

# Authors
<a href=www.github/irenecgn.com> Irene Cagnoni </a> </br> <a href=www.github/nachcoll.com> Nacho Coll</a> </br>
<a href=www.github/Mortyrise.com> Joan Marc Domènech </a> </br> <a href=www.github/xfortunyi.com> Xavi Fortuny </a>
