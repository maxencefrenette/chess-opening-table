import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Database } from '../shared/database';

let db = new Database('us-west-2');

let path = join(__dirname, 'schema.graphql');
let schema = buildSchema(readFileSync(path).toString());

// Root resolver
let root = {
    getPosition: ({ fen }: {fen: string}) => {
        return db.getPosition(fen);
    },
};

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
