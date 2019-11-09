import { GraphQLSchema } from 'graphql';
import mutations from './RootMutation';
import RootQuery from './RootQuery';

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations
})

export default schema