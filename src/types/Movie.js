import { GraphQLInt, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLFloat } from 'graphql';

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
    overview: { type: GraphQLString }
  })
})

export default MovieType;