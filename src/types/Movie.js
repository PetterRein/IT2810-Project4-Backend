import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLFloat } from 'graphql';
import MovieCommentType from './MovieComment';
import MovieComment from '../models/MovieComment';

// GraphQL typer så den kan sjekke at vi sender riktige typer. Dette er for Typen Movie
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    vote_average: { type: GraphQLFloat },
    poster_path: { type: GraphQLString },
    original_language: { type: GraphQLString },
    genre_ids: { type: GraphQLList(GraphQLInt) },
    release_date: { type: GraphQLString },
    overview: { type: GraphQLString },
    comments: { type: GraphQLList(MovieCommentType), 
      resolve: async function (movie) {
        var comments =  await MovieComment.find({movieid: movie.id})
        if(!comments) {
          throw new Error('No comments found')
        }
        return comments
    }}
  })
})

export default MovieType;