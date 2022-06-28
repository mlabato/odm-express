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
      return res.status(400).json({ errors: result.errors })
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
    //Validaciones username y mail
    db.User.findAll({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      },
    })
      .then((result) => {
        console.log(result);
        //En caso de no estar registrado ni el username y el mail
        if ((result.length == 0) & (req.body.email !== "")) {
          db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            type_id: 1,
          })
            .then(() => {
              res.send({
                status: 200,
                mensaje: "el user ha sido registrado",
              });
            })
            .catch(function (error) {
              console.log(error);
            });
          //en caso de estar registrado el username y/o el mail
        } else {
          res.send({
            errors: {
              status: 400,
              email: "ese email ya está registrado",
              username: "ese username ya existe",
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  //DELETE
  destroy: (req, res) => {
    db.User.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.redirect("http://localhost:3001/dashboard/admin");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

module.exports = userController;
