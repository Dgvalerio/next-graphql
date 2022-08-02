import { NextApiRequest, NextApiResponse } from 'next';

import { IResolvers } from '@graphql-tools/utils';

import { ApolloServer, gql } from 'apollo-server-micro';
import { RequestHandler } from 'micro';
import Cors from 'micro-cors';

const cors = Cors();

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers: IResolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const start = apolloServer.start();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | boolean> => {
  if (req.method === 'OPTIONS') {
    res.end();

    return false;
  }

  await start;

  await apolloServer.createHandler({
    path: '/api',
  })(req, res);
};

export default cors(handler as RequestHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};
