let express = require('express');
let router = express.Router();
let multer = require("multer");
const { body } = require("express-validator");

const cors = require("cors");

let apiController = require("../controllers/apiController");
let productController = require("../controllers/productController");
let userController = require("../controllers/userController");

router.use(cors());

//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
           cb(null, "./public/images/productImages");
           },
       
    filename: (req, file, cb) => {
          cb (null, Date.now() + file.originalname ); 
           }
    }
)
const upload = multer({ storage: storage });

//VALIDACIONES       
const productValidation = [      
       body("price")
       .notEmpty()
       .withMessage("Debe insertar un precio"),
       body("model")
       .isLength({ min: 4 })
       .withMessage("El modelo debe tener 4 caracteres"),
       body("stock")
       .notEmpty()
       .withMessage("Debe insertar un stock"),
       body("image")
       .notEmpty()
       .withMessage("Debe insertar una imagen"),
       body("category_id")
       .isIn([1,2,3,4])
       .withMessage("Seleccione una categoría"),
       body("material_id")
       .isIn([1,2,3,4,5])
       .withMessage("Seleccione un material"),
       body("color_id")
       .isIn([1,2,3,4,5,6,7,8,9,10])
       .withMessage("Seleccione un color"),
];

const userValidation = [
       body("email")
       .notEmpty()
       .isEmail()
       .withMessage("Debe insertar un email válido"),
       body("password")
       .isLength({ min: 6 })
       .withMessage("El password debe tener 4 caracteres"),
];



router.get("/", apiController.apiHome);
router.get("/products", apiController.products);
router.get("/users", apiController.users);
router.get("/users/:id", apiController.usersDetail);
router.get("/products/:id", apiController.productsDetail);
router.get("/bombillas", apiController.bombillas);
router.get("/mates", apiController.mates);
router.get("/materas", apiController.materas);
router.get("/termos", apiController.termos);
router.get("/onsale", apiController.onSale);

router.post("/create", upload.single("file"), productValidation, productController.save);
router.post("/edit",upload.single("file"), productValidation, productController.edit);
router.post('/delete', productController.destroy);


router.post("/login", userValidation, userController.login);
router.post("/register", userController.register);
router.post("/useredit", userValidation, userController.edit);
router.post('/userdelete', userController.destroy);





module.exports = router;