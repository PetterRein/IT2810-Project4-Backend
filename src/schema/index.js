import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLFloat } from 'graphql';
import mongoose from 'mongoose'
import MovieType from '../types/Movie'
import Movie from '../models/Movie';
import MovieCommentType from '../types/MovieComment';
import MovieComment from '../models/MovieComment';

// Holder alle våre schemaer som det går å spørre etter. De skulle helst vært delt opp i egne filer og importert hit hvis vi hadde hatt tid til å fikse det
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    numberOfMovies: {
      type: GraphQLInt,
      args: { filter: { type: GraphQLString }, sortField: {type: GraphQLString}, sortDir: {type: GraphQLBoolean}, vote_average: {type: GraphQLFloat} },
      resolve (_, args) {
        if (!args.vote_average) {args.vote_average = 0.0}
        if(args.filter && args.sortDir){
          const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField)
          return movies.count()
        }
        else if (args.filter) {
          const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort(args.sortField)
          return movies.count()
        }
        else if (args.sortDir){
          const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField)
          return movies.count()
        }
        else {
          const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort(args.sortField)
          return movies.count()
        }
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: { filter: { type: GraphQLString }, first: { type: GraphQLInt }, skip: { type: GraphQLInt}, sortField: {type: GraphQLString}, sortDir: {type: GraphQLBoolean}, vote_average: {type: GraphQLFloat} },
      resolve (_, args) {
        if (!args.vote_average) {args.vote_average = 0.0}
        if(args.filter && args.sortDir){
          const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField).skip(args.skip).limit(args.first)
          return movies
        }
        else if (args.filter) {
          const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort(args.sortField).skip(args.skip).limit(args.first)
          return movies
        }
        else if (args.sortDir){
          const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField).skip(args.skip).limit(args.first)
          return movies
        }
        else {
          const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort(args.sortField).skip(args.skip).limit(args.first)
          return movies
        }
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
    commentsForMovie: {
      type: new GraphQLList(MovieCommentType),
      args: { movieid: { type: GraphQLID } },
      resolve (_, args) {
        return MovieComment.find({movieid: args.movieid})
      }
    },
    comment: {
      type: MovieCommentType,
      args: { id: { type: GraphQLID } },
      resolve (_, args) {
        return MovieComment.findById(args.id)
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovieComment: {
      type: MovieCommentType,
      args: {
        movieid: { type: new GraphQLNonNull(GraphQLID)},
        comment: { type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (parent, args) => {
        let newMovieComment = new MovieComment({
          _id: mongoose.Types.ObjectId(),
          movieid: args.movieid,
          comment: args.comment
        });
        return newMovieComment.save()
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema