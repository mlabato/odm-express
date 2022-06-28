const db = require("../database/models");
const Sequelize = require("Sequelize");
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const userController = {
  //LOGIN
  login: (req, res) => {
    const result = validationResult(req);

    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }

    db.User.findAll({ where: { email: req.body.email } })
      .then((result) => {
        if (result.length === 0) {
          return res.status(400).json({ error: "el mail no está registrado" });
        } else {
          const passwordValidation = bcryptjs.compareSync(
            req.body.password,
            result[0].dataValues.password
          );
          if (passwordValidation == true) {
            return res
              .status(201)
              .json({ msg: "el usuario ha sido logueado correctamente" });
          } else {
            return res
              .status(400)
              .json({ error: "la contraseña no es correcta" });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  //CREATE
  register: (req, res) => {
    const result = validationResult(req);

    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    };

    //Validaciones username y mail
    db.User.findAll({
      where: {
        [Op.or]: { username: req.body.username, email: req.body.email },
      },
    })
      .then((result) => {
        //En caso de no estar registrado ni el username y el mail
        if (result.length === 0) {
          db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            type_id: 1,
          })
            .then(() => {
              return res.status(201).json({
                msg: "El usuario ha sido creado",
              });
            })
            .catch((error) => {
              console.log(error);
            });
          //en caso de estar registrado el username y/o el mail
        } else {
          return res.status(400).json({
            msg: "el username y/o el email están registrados",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //EDIT
  edit: (req, res) => {
    const result = validationResult(req);

    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }

     //Validaciones username y mail
    db.User.findAll({
        where: {
          [Op.or]: { username: req.body.username, email: req.body.email },
        },
      })
        .then((result) => {
          
          if (result.length === 0) {
            db.User.update(
                {
                  id: req.body.id,
                  username: req.body.username,
                  email: req.body.email,
                  password: bcryptjs.hashSync(req.body.password, 10),
                  type_id: 1,
                },
                {
                  where: { id: req.body.id },
                }
              )
              .then(() => {
                return res.status(201).json({
                  msg: "El usuario ha sido editado con éxito",
                });
              })
              .catch((error) => {
                console.log(error);
              });
            
          } else {
            console.log(typeof req.body.id)
            console.log(typeof result[0].dataValues.id)
            if(req.body.id == result[0].dataValues.id ){
              db.User.update(
                {
                  id: req.body.id,
                  username: req.body.username,
                  email: req.body.email,
                  password: bcryptjs.hashSync(req.body.password, 10),
                  type_id: 1,
                },
                {
                  where: { id: req.body.id },
                }
              )
              .then(() => {
                return res.status(201).json({
                  msg: "El usuario ha sido editado con éxito",
                });
              })
              .catch((error) => {
                console.log(error);
              });

            }else{
              return res.status(400).json({
                msg: "el username y/o el email están registrados",
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
  },
  //DELETE
  destroy: (req, res) => {
    db.User.destroy({
      where: { id: req.body.id },
    })
      .then((dbResponse) => {
        return res.status(201).json({
        
          data: dbResponse.dataValues,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

module.exports = userController;
