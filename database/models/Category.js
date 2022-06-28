module.exports = (sequelize, dataTypes) => {

    const alias = "Category";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };

    const config = {
        tableName: "categories", //nombre de tabla en dbeaver
        timestamps: false,
    };
    
    let Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Product, { //alias que le dimos a la tabla en el modelo
            as: "Product",
            foreignKey: "category_id"
        });

    };

    return Category;
};