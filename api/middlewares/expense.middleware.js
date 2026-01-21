import Joi from 'joi';

export function validateCreateExpense (req, res, next){

    const createExpenseSchema = Joi.object ({
         title : Joi.string().required(),
         amount : Joi.number().positive().required(),
         date : Joi.date().iso().max(10).required(),
         category_id : Joi.number().min(1).optional()// categorie pas obligatoire au moment de la creation une depense peut etre nue de categories


    });

        const validation = createExpenseSchema.validate(req.body)

        if(validation.error){
        return res.status(400).json({ error: validation.error });
        }

    next();
}

export function validateUpdateExpense (req, res, next){

    const updateExpenseSchema = Joi.object ({
         title : Joi.string(),
         amount : Joi.number().positive(),
         date : Joi.date().iso().max(10), // date au format YYYY-MM-DD
         category_id : Joi.number().min(1).optional()

    }).min(1) // au moins un champs requis a voir si on maintient

        const validation = updateExpenseSchema.validate(req.body)

        if(validation.error){
        return res.status(400).json({ error: validation.error });
        }

    next();
}