#!/usr/bin/env node
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expressGraphQL from 'express-graphql';
import schema from './schema'
import Movie from './models/Movie'
const fs = require('fs');
const app = express();
app.use(cors());

// Lager en endepunkt som svarer på / som gir deg Hello World tilbake, fint å teste med
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Lager et endepunkt for GraphQL, det er hit vi vil at alle spørringene fra fronteden skal gå
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))

// Lager en index og kobler oss på databasen vår
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/project3", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Hjelpe funskjon for å laste data inn i databasen første gang, kommenter ut loadMovies lengre nede hvis du vil laste data inn
function loadMovies() {
  const movies = JSON.parse(fs.readFileSync(__dirname + '/movies.json', 'utf8'))['results'];
  movies.forEach(function(movie) {
    //console.log(movie['popularity'])
    const newMovie = new Movie({
      _id: new mongoose.Types.ObjectId(),
      title: movie['title'], 
      popularity: movie['popularity'],
      vote_average: movie['vote_average'],
      poster_path: movie['poster_path'],
      original_language: movie['original_language'],
      genre_ids: movie['genre_ids'],
      release_date: movie['release_date'],
      overview: movie['overview'],
    })
    newMovie.save()
  });
};

//loadMovies()

// sier hvilken port vi vil svare på
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`server running on port ${port}`));
module.exports = app