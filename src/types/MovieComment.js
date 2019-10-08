import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

// GraphQL typer så den kan sjekke at vi sender riktige typer. Dette er for Typen MovieComment
const MovieCommentType = new GraphQLObjectType({
  name: 'MovieComment',
  fields: () => ({
    id: { type: GraphQLID },
    movieid: { type: GraphQLID },
    comment: { type: GraphQLString }
  })
})

export default MovieCommentType;