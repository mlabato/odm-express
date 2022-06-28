module.exports = (sequelize, dataTypes) => {

    const alias = "Product";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false,
        },
        model: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER,
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        virola_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        color_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        material_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    const config = {
        tableName: "products", //nombre de tabla en dbeaver
        timestamps: false,
    };
    
    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo (models.Color, { //alias que le dimos a la tabla en el modelo
            as: "Color",
            foreignKey: "color_id"
        });
        Product.belongsTo (models.Virola, { //alias que le dimos a la tabla en el modelo
            as: "Virola",
            foreignKey: "virola_id"
        });
        Product.belongsTo (models.Material, { //alias que le dimos a la tabla en el modelo
            as: "Material",
            foreignKey: "material_id"
        });
        Product.belongsTo (models.Category, { //alias que le dimos a la tabla en el modelo
            as: "Category",
            foreignKey: "category_id"
        });
    };
    
    return Product;
};