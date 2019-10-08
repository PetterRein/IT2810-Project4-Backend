# Backend repo for Project 3 in IT2810

This is a project developed with express, mongoDB, mongoose and nodemon for the course IT2810.

The guide at https://medium.com/@romerorickyio/how-to-setup-express-js-mongodb-cb3be7fab4b5 was used for this setup

### Notes
Made a new repo because Petter thinks it looks cleaner, downside is that we either have to use the issue board on the frontend for everything or have two issue boards. Its impossible to make a team wide project 3 issue board as this require Gitlab Silver.

For every other file like contributing, documentation see the Frontends README.

Server is running on port 5050 not 5000 because Petter had already something running on port 5000 and it was just easier to have this on 5050.

Express is the server application, mongoDB is the database, Mongoose is a ORM that abstracts the communication with the Database. Nodemon just restarts server when files changes.

MongoDB is running on the server, but you could download it an run yourself. Just follow the getting started steps. The monogdb on the server will be preloaded with data, the local one you have to yourself load with some data.

GraphQL is setup with help from this video: [Web Dev Simplified Learn GraphQL](https://www.youtube.com/watch?v=ZQL7tL2S0oQ)
## Getting started
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [MongoDB](https://docs.mongodb.com/)

### Prerequisites
- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/)

### Setup
- Install [Prerequisites](#prerequisites)
- Create a db in mongoDB with the name project3 and collection project3
- Check that mongodb is running on localhost:27017
- Navigate to desired location and clone repo
- Enter `cd project-3-backend` to enter repo folder
- Enter `npm install` to install required packages
- Enter `npm run server` to run the application
- backend should start at `localhost:5050`


### Utvidet dokumentasjon ihht oppgavekrav

Vi benytter Redux for å holde styr på dataflyten (State management, for å redusere behovet av synkronisering av komponenter manuelt slik som i tradisjonelle MVC-oppsett) sammen med Express (node webrammeverk), Mongo og GraphQL. Express kjører i Node og fungerer som en tjeneste som muliggjør spørringer til databasen gjennom HTTP. Et tilleggsverktøy GraphiQL kjører på /graphql og gjør at man kan teste spørringer direkte i nettleseren. 

I kildekoden ligger det filer som beskriver schema og oppsett for databasen. Types definerer GraphQL-typer og benyttes for å sjekke at riktige ting sendes på resolve. I schema-mappen er det definert GraphQL-schema som strukturer på endepunkter medargumenter for søk, filtrering og oppsett som GraphQL trenger for å vite hva som skal returneres og hvordan man skal spørre etter data. Denne inneholder også struktur mutasjoner med informasjon om hvordan man legger til ting i databasen (for eksempel addMovieComment). 

 Models-mappen inneholder MongoDB-modeller som forteller databasen hvordan modellene og deres felter / struktur ser ut.

 MongoDB er satt opp på VM som vi har fått tildelt, express kjører som en service og lytter på port 5050. For at ting skal se finere ut i spørringene våre så har vi satt opp en proxypass med Apache sånn at vi kan bruke /prosjekt/api isteden for port 5050.

 Det ligger ved en test men den sjekker bare egentlig at serveren bare starter og svarer. Mer testing av backenden er gjort gjennom Cypress i frontend repoet der vi interakterer med siden og ser hva vi får til svar.

