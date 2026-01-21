
import { Category, Expense, User } from '../models/index.js';
import HttpError from '../utils/HttpError.js';
import { Op } from 'sequelize';

class ExpenseController {

    // TODO: handling auth user to get user_id
    // This id will be replace by the auth user 
    userId = 1;

    
      getAllByMonth = async (req, res, next) => {
    
        try {
          const userId = 1;
    
          const RequestedDate = req.params.date;
          
          const expenses = await Expense.findAll({
            where : { 
                      user_id: userId,
                      date: {
                        [Op.startsWith]: RequestedDate,
                      }
                    },
            order: [["date", "DESC"]],
            include: [{ model: Category, as: "category" }],
          });

          if(!expenses) {
            throw new HttpError("Internal Server Error", 500);
          }
      
          res.status(200).json(expenses);
        }
        catch(error) {
          next(error)
        }
    
      }
    

    getAll = async (req, res, next) => {
        try {

            
            const limit = req.query.limit;

            if(limit) 
                {const expenseListLimit = await Expense.findAll({
                where: { user_id: this.userId},
                order: [["date", "DESC"]],
                include: [{ model: Category, as: "category" }],
                limit: limit
            });

            if (!expenseListLimit){
                throw new HttpError("Server Error", 500);
            }

            return res.status(200).json(expenseListLimit);
            }

            const expenseList = await Expense.findAll({
                where: { user_id: this.userId},
                order: [["date", "DESC"]],
                include: [{ model: Category, as: "category" }]
                
            });

            if (!expenseList){
                throw new HttpError("Server Error", 500);
            }

            res.status(200).json(expenseList);
        }
        catch(error){
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const expenseId = req.params.id;
            const expenseList = await Expense.findByPk(expenseId,{
                where: {user_id: this.userId},
                include: [{ model: Category, as: "category" }],

            });

            if (!expenseList){
                throw new HttpError("expense Not Found", 404);
            }

            res.status(200).json(expenseList);
        }
        catch(error){
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const expenseId = req.params.id;
            const nbElementsDestroyed = await Expense.destroy({
                where: {
                    id: expenseId,
                    user_id: this.userId
                }
            });

            if (nbElementsDestroyed === 0){
                throw new HttpError("expense Not Found", 404);
            }



            res.status(204).end();
        }
        catch(error){
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            const expenseToAdd = req.body;

            const result = await Expense.create({
                user_id: this.userId,
                title: expenseToAdd.title,
                amount: expenseToAdd.amount,
                date: expenseToAdd.date,
                category_id: expenseToAdd.category_id//voir si on doit le mettre ou pas
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
            const expenseId = req.params.id;
            const fieldToEdit = req.body;

            const result = await Expense.update(fieldToEdit, {
                where: {
                    id: expenseId,
                    user_id: this.userId
                },
                returning: true
            });
            
            if (!result[1][0]){
                throw new HttpError("Expense Not Found", 404);
            }

            res.status(200).json(result[1][0]);
        }
        catch(error){
            next(error);
        }
    }
}

export default new ExpenseController();
