import {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import MovieCommentType from '../types/MovieComment';
import MovieComment from '../models/MovieComment';
import mongoose from 'mongoose';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovieComment: {
      type: MovieCommentType,
      args: {
        movieid: { type: new GraphQLNonNull(GraphQLID)},
        comment: { type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (_, args) => {
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