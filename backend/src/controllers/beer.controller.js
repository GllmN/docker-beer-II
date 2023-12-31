"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBeer = exports.createBeer = exports.updateBeer = exports.getByIdBeer = exports.getAllBeers = void 0;
const data_source_1 = require("../utils/data-source");
const beer_1 = require("../entity/beer");
// GET all beers
function getAllBeers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beerRepository = data_source_1.AppDataSource.getRepository(beer_1.Beer);
            const beers = yield beerRepository.find();
            res.json(beers);
        }
        catch (error) {
            next(error); // Passez l'erreur au middleware d'erreur
        }
    });
}
exports.getAllBeers = getAllBeers;
// GET beer by ID
function getByIdBeer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id, 10);
            const beerRepository = data_source_1.AppDataSource.getRepository(beer_1.Beer);
            const beer = yield beerRepository.findOneBy({ id: id });
            if (beer) {
                res.json(beer);
            }
            else {
                res.status(404).json({ message: "Beer not found" });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getByIdBeer = getByIdBeer;
// PUT update beer
function updateBeer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id, 10);
            const beerRepository = data_source_1.AppDataSource.getRepository(beer_1.Beer);
            let beerToUpdate = yield beerRepository.findOneBy({ id: id });
            if (beerToUpdate) {
                beerRepository.merge(beerToUpdate, req.body);
                const results = yield beerRepository.save(beerToUpdate);
                res.json(results);
            }
            else {
                res.status(404).json({ message: "Beer not found" });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateBeer = updateBeer;
// POST create beer
function createBeer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('POST request body:', req.body);
        try {
            const beerRepository = data_source_1.AppDataSource.getRepository(beer_1.Beer);
            const beer = beerRepository.create(req.body);
            const results = yield beerRepository.save(beer);
            res.status(201).json(results);
        }
        catch (error) {
            console.error('Error during POST /api/beers:', error);
            next(error);
        }
    });
}
exports.createBeer = createBeer;
// DELETE beer
function deleteBeer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id, 10);
            const beerRepository = data_source_1.AppDataSource.getRepository(beer_1.Beer);
            const beerToDelete = yield beerRepository.findOneBy({ id: id });
            if (beerToDelete) {
                yield beerRepository.remove(beerToDelete);
                res.status(200).json({ message: "Beer deleted" });
            }
            else {
                res.status(404).json({ message: "Beer not found" });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteBeer = deleteBeer;
