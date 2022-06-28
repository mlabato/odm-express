module.exports = (sequelize, dataTypes) => {

    const alias = "User";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        type_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    const config = {
        tableName: "users", //nombre de tabla en dbeaver
        timestamps: false,
    };
    
    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo (models.User_type, { //alias que le dimos a la tabla en el modelo
            as: "User_type",
            foreignKey: "type_id"
        });
    };
    
    return User;
};