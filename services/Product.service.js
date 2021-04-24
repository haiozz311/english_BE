// const { Schema } = require("mongoose");
const { Product } = require("../models/Product.model");
const slugify = require('slugify')




function createCate(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    console.log("categories", categories);
    category = categories.filter(cate => cate.parentId == undefined)
  } else {
    category = categories.filter(cate => cate.parentId == parentId)
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCate(categories, cate._id)
    })
  }
  return categoryList;
}

// module.exports.getCategory = (req, res, next) => {

//   return Category.find()
//     .then((categories) => {
//       const CategoryList = createCate(categories);
//       return res.status(200).json(CategoryList);
//     })
//     .catch((err) => {
//       return res.status(500).json(err);
//     });
// };


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

module.exports.replaceStation = (req, res, next) => {
  const { stationId } = req.params;
  const { name, address, province } = req.body;
  Station.findById(stationId)
    .then((station) => {
      if (!station)
        return Promise.reject({
          status: 404,
          Message: "Station Not Found",
        });
      Object.keys(Object.keys(Station.schema.obj)).forEach((key) => {
        station[key] = req.body[key];
      });
      return station.save();
    })
    .then((station) => res.status(200).json(station))
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
    // .then((station) => res.status(200).json(station))
    .catch((err) => res.status(500).json(err));
};

module.exports.deleteStationById = (req, res, next) => {
  const { stationId } = req.params;
  let _station;
  Station.findById(stationId)
    .then((station) => {
      if (!station)
        return Promise.reject({
          status: 404,
          Message: "Station Not Found",
        });
      _station = station;
      return station.deleteOne();
    })
    .then(() => res.status(200).json(_station))
    .catch((err) => res.status(500).json(err));
};
