// const { Schema } = require("mongoose");
const { Product } = require("../models/Product.model");
const { Category } = require("../models/Category.model")
const slugify = require('slugify')

module.exports.getProduct = (req, res, next) => {

  return Product.find()
    .populate('category')
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};


module.exports.createProduct = (req, res, next) => {
  // res.status(200).json({ file: req.files, body: req.body })
  const { name, price, quantity, description, category, createBy } = req.body;
  let productPictures;
  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      return { img: file.filename }
    })
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createBy: req.user._id,
  })
  product.save()
    .then((product) => {
      return res.status(200).json(product)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
};

module.exports.getProductbySlug = (req, res, next) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select('_id')
    .then((category) => {
      Product.find({ category: category._id })
        .then((products) => {
          if (products.length > 0) {
            res.status(200).json({
              products,
              productsByPrice: {
                under5k: products.filter(product => product.price <= 5000),
                under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
              }
            })
          }
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.updateStation = (req, res, next) => {
  const { stationId } = req.params;
  const { name, address, province } = req.body;
  Station.findById(stationId)
    .then((station) => {
      if (!station)
        return Promise.reject({
          status: 404,
          Message: "Station Not Found",
        });
      // console.log(Station);
      Object.keys(req.body).forEach((key) => (station[key] = req.body[key]));
      // station.name = req.body.name ? req.body.name : station.name;
      // station.address = req.body.address ? req.body.address : station.address;
      // station.province = req.body.province
      //   ? req.body.province
      //   : station.province;

      return station.save();
    })
    .then((station) => res.status(200).json(station))
    .catch((err) => res.status(500).json(err));
};

module.exports.getStationById = (req, res, next) => {
  const { stationId } = req.params;
  Station.findById(stationId)
    .then((station) => {
      if (!station)
        return Promise.reject({
          status: 404,
          Message: "Station Not Found",
        });
      return res.status(200).json(station);
    })
    .catch((err) => res.status(500).json(err));
};

// module.exports.deleteStationById = (req, res, next) => {
//   const { stationId } = req.params;
//   let _station;
//   Station.findById(stationId)
//     .then((station) => {
//       if (!station)
//         return Promise.reject({
//           status: 404,
//           Message: "Station Not Found",
//         });
//       _station = station;
//       return station.deleteOne();
//     })
//     .then(() => res.status(200).json(_station))
//     .catch((err) => res.status(500).json(err));
// };
