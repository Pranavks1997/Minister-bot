const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const Busboy = require("busboy");



router.post("/api/upload", function(req, res) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("finish", function() {
    console.log("Upload finished");
    const file = req.files.ele2;
    console.log(file);
    var uploadedfile = "";
  let s3bucket = new AWS.S3({
    accessKeyId: "AKIAIWDM63VWOEMDV7TA",
    secretAccessKey: "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",
    Bucket: "hawkeyeeee11"
  });
  
    var params = {
      Bucket: "hawkeyeeee11",
      Key: file.name,
      Body: file.data
    };
    
     s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
        return {
            response: "ERROR",
            message: err.message
        }
       
      }
      console.log("success");
      console.log(data.Location);
       const resp = {
      fileloc:  data.Location
    };
    res.send(resp);
      

      
    });
     
   
  });
  req.pipe(busboy);
  
});



module.exports = router;


