import "reflect-metadata";
import { DataSource } from "typeorm";
import { Beer } from "../entity/beer";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.NODE_ENV !== 'production', // Activez la synchronisation seulement si ce n'est pas l'environnement de production
    entities: [Beer],
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.error("Error during Data Source initialization", err);
});