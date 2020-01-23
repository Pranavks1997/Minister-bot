const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Agenda = mongoose.model('Agenda')
const Db = require('../models/Db')
const AWS = require("aws-sdk");
const Busboy = require("busboy");


router.post("/api/add", (req, res) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("finish", function() {
    console.log("Upload finished");
    const file = req.files.image;
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
        };
      }
      console.log("success");
      console.log(data.Location);
      var parti = {} 
      if(req.body.participants){
          parti = req.body.participants;
      }
      else{
        parti = {}
      }
      console.log(req.body.hoursch);
      insert_agenda_record(
        req.body.id,
        req.body.event,
        req.body.local,
        parti,
        req.body.hoursch,
        data.Location
      )
        .then(resp => {
          const result = {
            Status: true,
            data: resp
          };
          res.send(result);
        })
        .catch(err => {
          const error = {
            Status: false,
            message: err.message
          };
          res.send(error);
        });
    });
  });
  req.pipe(busboy);
});


// GET all Agenda
router.get('/', (req, res) => {
     //insert_agenda_record();
    Db.Agenda.find().exec((err, data) => {
        if (err) {
           const error = {
               status: false,
               message: err.message
           }
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

async function insert_agenda_record(id,event,local,participants,hoursch,imageUrl) {
//setting
var row1 = new Agenda({
    ID: id,
    Event: event,
    Local: local,
    Hour_Scheduled: hoursch,
    Participants: participants,
    Image: imageUrl,
});

// save model to database
await row1.save(function(err, row1) {
  if (err) {
    return console.error(err);
  } else {
    console.log(row1.ID + " saved to Agenda collection.");
    return row1.ID;
  }
});
} 


module.exports = router;
