module.exports = (sequelize, dataTypes) => {

    const alias = "Color";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        color: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };

    const config = {
        tableName: "colors", //nombre de tabla en dbeaver
        timestamps: false,
    };
    
    let Color = sequelize.define(alias, cols, config);

    Color.associate = function(models){
        Color.hasMany(models.Product, { //alias que le dimos a la tabla en el modelo
            as: "Product",
            foreignKey: "color_id"
        });

    };

    return Color;
};