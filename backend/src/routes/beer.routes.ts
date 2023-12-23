import { Router } from "express";
import * as BeerController from "../controllers/beer.controller";

const router = Router();

router.get('/', BeerController.getAllBeers);

router.get('/:id', BeerController.getByIdBeer);

router.put('/:id', BeerController.updateBeer);

router.post('/', BeerController.createBeer);

router.delete('/:id', BeerController.deleteBeer)

export default router;