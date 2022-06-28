const db = require("../database/models");
const Sequelize = require ("Sequelize");
const Op = db.Sequelize.Op;

const apiController = {
//HOME
    apiHome: (req,res) =>{
      res.send(
      {
       Endpoints: {
          home: "/",
          products: "/products",
          mates: "/mates",
          materas: "/materas",
          bombillas: "/bombillas",
          termos: "/termos",
          onSale: "/onsale",
          product: "/product/:id"
        }
      })
    },
//TOTAL PRODUCTS
    products: (req, res) => {
        db.Product.findAll()
        .then((products) => {

        let apiProducts = products.map(product => {
          return(
            {
              id: product.id,
              category: product.category_id,
              price: product.price,
              model: product.model,
              discount: product.discount,
              stock: product.stock,              
              image: "http://localhost:3000/images/productImages/" + product.image,
              virola: product.virola_id,
              color: product.color_id,
              material: product.material_id,
              detail: "/products/" + product.id
            }
          )
        })
         res.json({
           totalProducts: products.length,
           categories: {
              mates: " " + products.filter(product => product.category_id == 1).length,
              materas: " " + products.filter(product => product.category_id == 2).length,
              bombillas: " " + products.filter(product => product.category_id == 3).length,
              termos: " " + products.filter(product => product.category_id == 4).length,
           },
           products: apiProducts,
         })
        })
        .catch(errors => console.log(errors))
    },
//PRODUCT DETAIL
    productsDetail: (req,res) => {
      db.Product.findByPk(req.params.id)
      .then(product => {
        if(product == undefined){
          return res.send("cargando")
        }else{
          return res.json(
            {
              id: product.id,
              category: product.category_id,
              price: product.price,
              model: product.model,
              discount: product.discount,
              stock: product.stock,              
              image: "http://localhost:3000/images/productImages/" + product.image,
              virola: product.virola_id,
              color: product.color_id,
              material: product.material_id,
            }
          )
        }          
      })
      .catch(errors => console.log(errors))  
   },
//TOTAL USERS
   users: (req,res) => {
      db.User.findAll()
      .then((users) => {
          res.json(
            {
              users
            })
      })
      .catch(errors => console.log(errors))
   },
//USER DETAIL
   usersDetail: (req, res) => {
    db.User.findByPk(req.params.id)
    .then(user => {
      if(user == undefined){
        return res.send("cargando")
      }else{
        return res.json(
          {
            id: user.id,
            type: user.type_id,
            username: user.username,
            email: user.email,
          }
        )
      }          
    })
    .catch(errors => console.log(errors))  
   },  
//BOMBILLAS
   bombillas: (req, res) => {
    db.Product.findAll()
    .then((products) => {
      let bombillas = products.filter(product => product.category_id == 3)
      res.json(
        {bombillas: bombillas }
      )
    })
    .catch(errors => console.log(errors))
 },
//MATES
    mates: (req, res) => {
      db.Product.findAll()
      .then((products) => {
        let mates = products.filter(product => product.category_id == 1)
        res.json(
          {mates: mates } 
        )
      })
      .catch(errors => console.log(errors))
    },
//MATERAS
    materas: (req, res) => {
      db.Product.findAll()
      .then((products) => {
        let materas = products.filter(product => product.category_id == 2)  
        res.json(
          {materas: materas } 
        )
      })
      .catch(errors => console.log(errors))
  },
//TERMOS
    termos: (req, res) => {
      db.Product.findAll()
      .then((products) => {
        let termos = products.filter(product => product.category_id == 4)  
        res.json(
          {termos: termos } 
        )
      })
      .catch(errors => console.log(errors))
    },
//ON SALE
    onSale: (req, res) => {
      db.Product.findAll()
      .then((products) => {
        let onSale = products.filter(product => product.discount > 0.01)  
        res.json(
          {onSale : onSale } 
        )
      })
      .catch(errors => console.log(errors))
    },
};

module.exports = apiController;