import { Router } from 'express';
import categoryController from '../controllers/category.controller.js';
import { validateId } from '../middlewares/common.middleware.js';

const router = Router();

router.get("/categories", categoryController.getAll);
router.get("/categories/:id", validateId, categoryController.getById);
router.delete("/categories/:id", validateId, categoryController.delete);
router.post("/categories", categoryController.create);
router.patch("/categories/:id", validateId, categoryController.update);


export default router;