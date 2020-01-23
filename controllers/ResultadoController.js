const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Resultado = mongoose.model('Resultado')
const Db = require('../models/Db')
const AWS = require("aws-sdk");
const Busboy = require("busboy");


router.post('/api/add',(req,res)=>{

    var busboy = new Busboy({ headers: req.headers });
    busboy.on("finish", function() {
      console.log("Upload finished");
      const file = req.files.image;
      const avatar = req.files.avatar;
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
      var params1 = {
        Bucket: "hawkeyeeee11",
        Key: avatar.name,
        Body: avatar.data
      };

      s3bucket.upload(params, function(err, data) {
        if (err) {
          console.log("error in callback");
          console.log(err);
          return {
            response: "ERROR",
            message: err.message
          };
        }
        console.log("success");
        console.log(data.Location);
        const imageUrl = data.Location;

        s3bucket.upload(params1, function(err, data) {
          if (err) {
            console.log("error in callback");
            console.log(err);
            return {
              response: "ERROR",
              message: err.message
            };
          }
          console.log("success");
          console.log(data.Location);
          const avatarUrl = data.Location;
          insert_resultado_record(req.body.id,req.body.title,req.body.desc,imageUrl,avatarUrl).then(resp =>{
              res.send({
                  status:true,
                  addedrecord : resp
              })
          }).catch(err =>{
               const error = {
                 Status: false,
                 message: err.message
               };
               res.send(error);
          })


        });
        
      });


    });
    req.pipe(busboy);
    

})
// GET all Resultado
router.get('/', (req, res) => {
    //insert_resultado_record();
   Db.Resultados.find().exec((err, data) => {
        if (err) {
            const error = {
              status: false,
              message: err.message
            };
            res.send(error);
        } else {
           
            const result = {
                status: true,
                data: data,

            }
             res.send(result);
        }
    });
})

async function insert_resultado_record(id,title,desc,imageUrl,avatarUrl) {
//setting
var row1 = new Resultado({
    ID: id,
    Title: title,
    Description: desc,
    Image: imageUrl,
    avatar: avatarUrl
    //Timestamps: new Date().getTime()
});

// save model to database
await row1.save(function (err, row1) {
    if (err) {return console.error(err);}
    else{
         console.log(row1.ID + " saved to Resultado collection.");
         return row1.ID
    }
   
});
} 

module.exports = router;