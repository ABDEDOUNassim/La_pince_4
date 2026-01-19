import Expense from "../models/Expense.js";
import Category from "../models/Category.js";
import HttpError from "../utils/HttpError.js";
import { Op } from "sequelize";

class ExpenseController {

  // ===============================
  // GET /expense
  // GET /expense?month=YYYY-MM
  // Récupérer toutes les dépenses de l'utilisateur
  // ===============================
  getAll = async (req, res, next) => {
    console.log("Appel de getAll dans ExpenseController");

    try {
      // Vérifier la connexion de l'utilisateur
      if (!req.user || !req.user.id) {
        return next(new HttpError("User not authenticated", 401));
      }

      const userId = req.user.id;
      const { month } = req.query;

      // Filtre de base: uniquement les dépenses du user
      const where = { user_id: userId };

      // Filtre optionnel par mois (SQL)
      if (month) {
        const [yearStr, monthStr] = month.split("-");
        const year = Number(yearStr);
        const monthNum = Number(monthStr);

        if (!year || !monthNum || monthNum < 1 || monthNum > 12) {
          return next(new HttpError("Invalid month format. Use YYYY-MM", 400));
        }

        // Intervalle [start, end) : du 1er jour du mois au 1er jour du mois suivant
        const start = new Date(Date.UTC(year, monthNum - 1, 1, 0, 0, 0));
        const end = new Date(Date.UTC(year, monthNum, 1, 0, 0, 0));

        where.date = {
          [Op.gte]: start,
          [Op.lt]: end,
        };
      }

      const expenses = await Expense.findAll({
        where,
        order: [["date", "DESC"]],
        include: [{ model: Category, as: "category" }],
      });

      return res.status(200).json(expenses);
    } catch (error) {
      return next(error);
    }
  };

  // ===============================
  // GET /expense/:id
  // Récupérer une dépense par son id
  // ===============================
  getById = async (req, res, next) => {
    console.log("Appel de getById dans ExpenseController");

    try {
      if (!req.user || !req.user.id) {
        return next(new HttpError("User not authenticated", 401));
      }

      const userId = req.user.id;
      const idExpense = req.params.id;

      const expense = await Expense.findOne({
        where: { id: idExpense, user_id: userId },
        include: [{ model: Category, as: "category" }],
      });

      if (!expense) {
        return next(new HttpError("Expense not found", 404));
      }

      return res.status(200).json(expense);
    } catch (error) {
      return next(error);
    }
  };

  // ===============================
  // POST /expense
  // Créer une nouvelle dépense
  // ===============================
  create = async (req, res, next) => {
    console.log("Appel de create dans ExpenseController");

    try {
      if (!req.user || !req.user.id) {
        return next(new HttpError("User not authenticated", 401));
      }

      const userId = req.user.id;
      const { title, amount, date, category_id } = req.body;

      if (!title || amount === undefined || !date || !category_id) {
        return next(new HttpError("Missing required fields", 400));
      }

      // Vérifier que la catégorie appartient au user
      const category = await Category.findOne({
        where: { id: category_id, user_id: userId },
      });

      if (!category) {
        return next(new HttpError("Invalid category_id", 400));
      }

      const newExpense = await Expense.create({
        title,
        amount,
        date,
        category_id,
        user_id: userId,
      });

      return res.status(201).json(newExpense);
    } catch (error) {
      return next(error);
    }
  };

  // ===============================
  // PATCH /expense/:id
  // Modifier une dépense
  // ===============================
  update = async (req, res, next) => {
    console.log("Appel de update dans ExpenseController");

    try {
      if (!req.user || !req.user.id) {
        return next(new HttpError("User not authenticated", 401));
      }

      const userId = req.user.id;
      const idExpense = req.params.id;

      const expense = await Expense.findOne({
        where: { id: idExpense, user_id: userId },
      });

      if (!expense) {
        return next(new HttpError("Expense not found", 404));
      }

      // Si on change category_id, vérifier qu'elle appartient au user
      if (req.body.category_id !== undefined) {
        const category = await Category.findOne({
          where: { id: req.body.category_id, user_id: userId },
        });

        if (!category) {
          return next(new HttpError("Invalid category_id", 400));
        }
      }

      // Version débutant : construire l'objet champ par champ
      const dataToUpdate = {};
      if (req.body.title !== undefined) dataToUpdate.title = req.body.title;
      if (req.body.amount !== undefined) dataToUpdate.amount = req.body.amount;
      if (req.body.date !== undefined) dataToUpdate.date = req.body.date;
      if (req.body.category_id !== undefined) dataToUpdate.category_id = req.body.category_id;

      if (Object.keys(dataToUpdate).length === 0) {
        return next(new HttpError("No fields provided to update", 400));
      }

      await expense.update(dataToUpdate);

      return res.status(200).json(expense);
    } catch (error) {
      return next(error);
    }
  };

  // ===============================
  // DELETE /expense/:id
  // Supprimer une dépense
  // ===============================
  delete = async (req, res, next) => {
    console.log("Appel de delete dans ExpenseController");

    try {
      if (!req.user || !req.user.id) {
        return next(new HttpError("User not authenticated", 401));
      }

      const userId = req.user.id;
      const idExpense = req.params.id;

      const nbDestroyed = await Expense.destroy({
        where: { id: idExpense, user_id: userId },
      });

      if (nbDestroyed === 0) {
        return next(new HttpError("Expense not found", 404));
      }

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
}

const myController = new ExpenseController();
export default myController;
