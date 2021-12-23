import { createConnection, Connection } from "typeorm";
import express, { Application } from "express";
import userRoute from "./routes/user";
import User from "./entities/User";
import Photos from "./entities/Photos";

(async() => {
    try {
        const connection: Connection = await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1234",
            database: "test",
            synchronize: true,
            entities: [User, Photos],
        });

        const app = express();
        app.use(express.json());

        app.use('/api', userRoute);

        app.listen(3000, () => {
            console.log("Server started on port 3000");
        })
    
        console.log('Connected to database');
    } catch(error) {
        console.log('Error connecting to database');
    }

})();






