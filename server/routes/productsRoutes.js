const express = require("express");
const { productController } = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.get);
router.get("/:id", productController.getById);
router.post("/", productController.post);
router.delete("/:id", productController.delete);
router.put("/:id", productController.put);

module.exports = router;
