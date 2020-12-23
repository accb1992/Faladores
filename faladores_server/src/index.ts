import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entities/User";
import { News } from "./entities/News";
import { Comment } from "./entities/Comment";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import { NewsResolver } from "./resolvers/NewsResolver";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "faladores", 
        logging: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, News, Comment] 
    });

    await conn.runMigrations();

    const app = express();
    
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, NewsResolver, UserResolver], 
            validate: false
        })
    });

    server.applyMiddleware( { app, cors: false});

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    })
}

main().catch((err) => {
    console.log(err);
});
