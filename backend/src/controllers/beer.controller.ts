import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../utils/data-source";
import { Beer } from "../entity/beer";

// GET all beers
export async function getAllBeers(req: Request, res: Response, next: NextFunction) {
    try {
        const beerRepository = AppDataSource.getRepository(Beer);
        const beers = await beerRepository.find();
        res.json(beers);
    } catch (error) {
        next(error); // Passez l'erreur au middleware d'erreur
    }
}

// GET beer by ID
export async function getByIdBeer(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id, 10);
        const beerRepository = AppDataSource.getRepository(Beer);
        const beer = await beerRepository.findOneBy({ id: id });
        if (beer) {
            res.json(beer);
        } else {
            res.status(404).json({ message: "Beer not found" });
        }
    } catch (error) {
        next(error);
    }
}

// PUT update beer
export async function updateBeer(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id, 10);
        const beerRepository = AppDataSource.getRepository(Beer);
        let beerToUpdate = await beerRepository.findOneBy({ id: id });

        if (beerToUpdate) {
            beerRepository.merge(beerToUpdate, req.body);
            const results = await beerRepository.save(beerToUpdate);
            res.json(results);
        } else {
            res.status(404).json({ message: "Beer not found" });
        }
    } catch (error) {
        next(error);
    }
}

// POST create beer
export async function createBeer(req: Request, res: Response, next: NextFunction) {
    console.log('POST request body:', req.body);
    try {
        const beerRepository = AppDataSource.getRepository(Beer);
        const beer = beerRepository.create(req.body);
        const results = await beerRepository.save(beer);
        res.status(201).json(results);
    } catch (error) {
        console.error('Error during POST /api/beers:', error);
        next(error);
    }
}

// DELETE beer
export async function deleteBeer(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id, 10);
        const beerRepository = AppDataSource.getRepository(Beer);
        const beerToDelete = await beerRepository.findOneBy({ id: id });

        if (beerToDelete) {
            await beerRepository.remove(beerToDelete);
            res.status(200).json({ message: "Beer deleted" });
        } else {
            res.status(404).json({ message: "Beer not found" });
        }
    } catch (error) {
        next(error);
    }
}
