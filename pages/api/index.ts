import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';

import { UserResolver } from '@/user/user.resolver';

import { ApolloServer } from 'apollo-server-micro';
import { RequestHandler } from 'micro';
import Cors from 'micro-cors';
import path from 'path';
import { buildSchemaSync } from 'type-graphql';

const cors = Cors();

const schema = buildSchemaSync({
  resolvers: [UserResolver],
  emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
});

const apolloServer = new ApolloServer({ schema });

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
