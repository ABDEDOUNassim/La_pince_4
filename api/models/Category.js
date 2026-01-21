import sequelize from '../database/sequelize-client.js';
import { Sequelize, Model, DataTypes } from 'sequelize';


class Category extends Model {

//methodes
}

Category.init(
  {
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    color: { 
        type : DataTypes.STRING(7),
        defaultValue : '#ff7d3d',
        allowNull : false,
        unique : false,
              
    },
    icon: {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : 'https://static.vecteezy.com/ti/vecteur-libre/p1/13277422-dollar-sur-le-batiment-presentant-l-icone-du-batiment-de-la-banque-vectoriel.jpg',
    },

    max_budget : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,
        defaultValue : 0,
    }

      },
    { sequelize, modelName: 'category'}
);

export default Category;