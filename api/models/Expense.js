import sequelize from '../database/sequelize-client.js';
import { Sequelize, Model, DataTypes } from 'sequelize';



class Expense extends Model {
    
     // Méthodes ici
}

Expense.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.00
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
        },
    { sequelize, modelName: 'expense'}
);

export default Expense;