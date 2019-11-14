import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLFloat } from 'graphql';
import MovieType from '../types/Movie'
import Movie from '../models/Movie';
import MovieCommentType from '../types/MovieComment';
import MovieComment from '../models/MovieComment';
import getMoviesFromDB, {getNumberOfMovies} from '../resolvers/Movies';

// Holder alle våre schemaer som det går å spørre etter. De skulle helst vært delt opp i egne filer og importert hit hvis vi hadde hatt tid til å fikse det
export default new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      args: { filter: { type: GraphQLString }, first: { type: GraphQLInt }, skip: { type: GraphQLInt}, sortField: {type: GraphQLString}, sortDir: {type: GraphQLBoolean}, vote_average: {type: GraphQLFloat} },
      resolve (_, args) {
        return getMoviesFromDB(args)
      }
    },
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve (_, args) {
        return Movie.findById(args.id)
      }
    },
    comments: {
      type: new GraphQLList(MovieCommentType),
      resolve () {
        return MovieComment.find({})
      }
    },
    comment: {
      type: MovieCommentType,
      args: { id: { type: GraphQLID } },
      resolve (_, args) {
        return MovieComment.findById(args.id)
      }
    },
    numberOfMovies: {
      type: GraphQLInt,
      args: { filter: { type: GraphQLString }, sortField: {type: GraphQLString}, sortDir: {type: GraphQLBoolean}, vote_average: {type: GraphQLFloat} },
      resolve (_, args) {
        return getNumberOfMovies(args)
      }
    }
  }
});
