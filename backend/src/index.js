"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error-middleware");
const data_source_1 = require("./utils/data-source");
const beer_routes_1 = __importDefault(require("./routes/beer.routes"));
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const cors = require('cors');
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    app.use('/api/beers', beer_routes_1.default);
    app.use(error_middleware_1.errorMiddleware);
    const port = 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(error => console.log(error));
