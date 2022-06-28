module.exports = (sequelize, dataTypes) => {

    const alias = "User_type";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        type: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };

    const config = {
        tableName: "user_types", //nombre de tabla en dbeaver
        timestamps: false,
    };
    
    let User_type = sequelize.define(alias, cols, config);

    User_type.associate = function(models){
        User_type.hasMany(models.User, { //alias que le dimos a la tabla en el modelo
            as: "User",
            foreignKey: "type_id"
        });

    };

    return User_type;
};