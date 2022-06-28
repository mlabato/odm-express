module.exports = (sequelize, dataTypes) => {

    const alias = "Material";

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
        tableName: "materials", //nombre de tabla en dbeaver
        timestamps: false,
    };
    
    let Material = sequelize.define(alias, cols, config);

    Material.associate = function(models){
        Material.hasMany(models.Product, { //alias que le dimos a la tabla en el modelo
            as: "product",
            foreignKey: "material_id"
        });
    };

    return Material;
};