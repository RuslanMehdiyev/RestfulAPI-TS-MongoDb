const { product } = require("../models/Products");

const productController = {
  get: (req, res) => {
    product.find({}, (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getById: (req, res) => {
    let id = req.params.id;
    product.findById(id, (err, doc) => {
      if (!err) {
        res.status(200).json(doc);
      } else {
        res.status(404).json("Product not found");
      }
    });
  },
  post: (req, res) => {
    let newProduct = new product({
      name: req.body.name,
      description: req.body.description,
    });
    newProduct.save(function (err, doc) {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  delete: (req, res) => {
    let id = req.params.id;
    product.findByIdAndDelete(id, (err, doc) => {
      if (!err) {
        res.json("Product deleted");
      } else {
        res.status(500).json(err);
      }
    });
  },
  put: (req, res) => {
    let id = req.params.id;
    product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
      (err, doc) => {
        if (!err) {
          res.status(201).json(doc);
        } else {
          console.log(err.message);
          res.status(500).json(err.message);
        }
      }
    );
  },
};

module.exports = {
  productController,
};
