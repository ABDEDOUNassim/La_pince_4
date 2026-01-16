import { Router } from 'express';
import categoryController from '../controllers/category.controller.js';

const router = Router();

router.get("/categories", categoryController.getAll);
router.get("/categories/:id", categoryController.getById);
router.delete("/categories/:id", categoryController.delete);
router.post("/categories", categoryController.create);
router.patch("/categories/:id", categoryController.update);


export default router;