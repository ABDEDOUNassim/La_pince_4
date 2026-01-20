import { Category, User } from '../models/index.js';
import HttpError from '../utils/HttpError.js';

class CategoryController {

    // TODO: handling auth user to get user_id
    // This id will be replace by the auth user 
    userId = 1;

    getAll = async (req, res, next) => {
        try {
            const categoryList = await Category.findAll({
                where: {
                    user_id: this.userId
                }
            });

            if (!categoryList){
                throw new HttpError("Server Error", 500);
            }

            res.status(200).json(categoryList);
        }
        catch(error){
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const categoryList = await Category.findByPk(categoryId,{
                where: {
                    user_id: this.userId
                }
            });

            if (!categoryList){
                throw new HttpError("Category Not Found", 404);
            }

            res.status(200).json(categoryList);
        }
        catch(error){
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const nbElementsDestroyed = await Category.destroy({
                where: {
                    id: categoryId,
                    user_id: this.userId
                }
            });

            if (nbElementsDestroyed === 0){
                throw new HttpError("Category Not Found", 404);
            }



            res.status(204).end();
        }
        catch(error){
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            const categoryToAdd = req.body;

            const result = await Category.create({
                user_id: this.userId,
                name: categoryToAdd.name,
                color: categoryToAdd.color,
                icon: categoryToAdd.icon,
                max_budget: categoryToAdd.max_budget
            });

            if (!result){
                throw new HttpError("Bad Request", 400);
            }

            res.status(201).json(result);
        }
        catch(error){
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const fieldToEdit = req.body;

            const result = await Category.update(fieldToEdit, {
                where: {
                    id: categoryId,
                    user_id: this.userId
                },
                returning: true
            });
            
            if (!result[1][0]){
                throw new HttpError("Category Not Found", 404);
            }

            res.status(200).json(result[1][0]);
        }
        catch(error){
            next(error);
        }
    }
}

export default new CategoryController();