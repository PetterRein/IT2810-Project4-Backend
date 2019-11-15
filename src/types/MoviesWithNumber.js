import { GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql';
import MovieType from './Movie'

// GraphQL typer så den kan sjekke at vi sender riktige typer. Dette er for Typen MovieComment
const MoviesWithNumbersType = new GraphQLObjectType({
  name: 'MoviesWithNumbers',
  fields: () => ({
    movies: { type: new GraphQLList(MovieType) },
    nrMovies: { type: GraphQLInt },
  })
})

export default MoviesWithNumbersType;