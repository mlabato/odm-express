const db = require("../database/models");
const Sequelize = require("Sequelize");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

const productController = {
  //DASHBOARD CREATE
  save: (req, res) => {
      const result = validationResult(req);
      
      if (result.errors.length > 0) {
        return res.status(400).json({ errors: result.errors })
      }

      db.Product.create({
        ...req.body,
        image: req.file.filename,
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
  //DASHBOARD EDIT
  edit: (req, res) => {
    const result = validationResult(req);
      
    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors })
    }

      db.Product.update(
        {
          ...req.body,
          image: req.file.filename,
        },
        {
          where: { id: req.body.id },
        }
      )
        .then((dbResponse) => {
          console.log(dbResponse);
          return res.status(201).json({
            data: dbResponse.dataValues,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    
  },
  //DASHBOARD DELETE
  destroy: (req, res) => {
    db.Product.destroy({
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

module.exports = productController;
