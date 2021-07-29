// const { Schema } = require("mongoose");
const { Category } = require("../models/Category.model");
const slugify = require("slugify");


function createCate(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter(cate => cate.parentId == undefined)
  } else {
    category = categories.filter(cate => cate.parentId == parentId)
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCate(categories, cate._id)
    })
  }
  return categoryList;
}

module.exports.getCategory = (req, res, next) => {

  return Category.find()
    .then((categories) => {
      const CategoryList = createCate(categories);
      return res.status(200).json(CategoryList);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};


module.exports.createCategory = (req, res, next) => {

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    // categoryImage: categoryUrl
  }
  if (req.file) {
    console.log("file")
    categoryObj.categoryImage = 'http://localhost:5000/public/' + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save()
    .then((category) => {
      return res.status(200).json(category)
    })
    .catch((error) => {
      console.log("errror", error)
      return res.status(400).json(error)
    })
};


module.exports.updateCategory = async (req, res, next) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};
// nếu ko có new:true khi dùng findoneandUpdate để chạy 1 truy vấn riêng

module.exports.deleteCategory = async (req, res, next) => {
  const ids = req.body;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
      // createdBy: req.user._id,
    });
    // return res.status(201).json({ mesage: deleteCategory })
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
