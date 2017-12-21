import { Database } from '@chess-opening-table/database';
import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import { join } from 'path';

const db = new Database('us-west-2');

const path = join(__dirname, 'schema.graphql');
const schema = buildSchema(readFileSync(path).toString());

// Root resolver
const root = {
    getPosition: ({ fen }: {fen: string}) => {
        return db.getPosition(fen);
    },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('API server started on port 4000');
