const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require("cors");
const config = require("./config/index");
const path = require('path');
const mongoose = require("mongoose");
const userController = require("./controllers/User.controller");
const contegoryController = require("./controllers/Category.controller");
const productController = require("./controllers/Product.controller");
const cartController = require("./controllers/Cart.controller");
const PageController = require("./controllers/Page.controller");
const AddressController = require("./controllers/Address.controller");
const OrderController = require("./controllers/Order.controller");
// handle Router
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use("/api", userController);
app.use("/api", contegoryController);
app.use("/api", productController);
app.use("/api", cartController);
app.use("/api", PageController);
app.use("/api", AddressController);
app.use("/api", OrderController);

// app.use("/img", express.static("img"));
// img1 la ten duong dan tren brower
// img2 la thu muc chua tam hinh cua minh

console.log("config", config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connect to database successfully");
  })
  .catch(console.log);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
