module.exports = (sequelize, dataTypes) => {

    const alias = "Virola";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        material: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };

    const config = {
        tableName: "virolas", //nombre de tabla en dbeaver
        timestamps: false,
    };
    
    let Virola = sequelize.define(alias, cols, config);

    Virola.associate = function(models){
        Virola.hasMany(models.Product, { //alias que le dimos a la tabla en el modelo
            as: "product",
            foreignKey: "virola_id"
        });
    };

    return Virola;
};