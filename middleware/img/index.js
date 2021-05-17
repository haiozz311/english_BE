const multer = require("multer");

// __dirname duong dan truc tiep dan den file
// type : avatar , trips , coach
module.exports.uploadImages = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, `${__dirname}/../../img/${type}s`); // di ra thu muc chua no
    },
    filename: function (req, file, cb) {

      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  return upload.single(type); // MDW (req,res,next)
};
