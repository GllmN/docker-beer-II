import "reflect-metadata";
import express from "express";
import { errorMiddleware } from "./middleware/error-middleware";
import { AppDataSource } from "./utils/data-source";
import beerRoutes from "./routes/beer.routes";

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());

    const cors = require('cors');
    app.use(cors({
        origin: 'http://localhost:4200'
      }));

    app.use('/api/beers', beerRoutes);
    
    app.use(errorMiddleware);

    const port = 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(error => console.log(error));