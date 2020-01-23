const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const Minister = mongoose.model('Minister')
const Db = require('../models/Db');
const dialogflow = require("dialogflow");
const uuid = require("uuid");


async function runGetToken(device_id) {
  // A unique identifier for the given session
  projectId = "minister-lgkdat";
  
  const sessionId = device_id;

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./Minister-66fd4df61571.json"
  });
  //console.log(sessionClient);
  const sessionPath = await sessionClient.sessionPath(projectId, sessionId);
  //console.log(sessionPath);

  return sessionPath
  
  
  };

  
  
router.post('/',(req,res)=>{
    var deviced = req.body.device_id
   // console.log(req.body.device_id);
    var getsession = runGetToken(deviced);
    getsession
      .then(response => {
        console.log("Promise resolved");
        //insert_Token(response);
       // console.log(response);
       const resp ={
           status : true,
           token : response

       }
        res.send(JSON.stringify(resp));
      })
      .catch(err=> {
        console.log("Promise rejected");
         const error = {
           status: false,
           message: err.message
         };
         res.send(error);
      });




})
// GET Tokerns
//

//router.get('/', (req, res) => {
    // Db.Minister.find({Status: 'Active'}).exec((err, data) => {
    //     if (err) {} else {
    //         res.send(data);
    //     }
    // });
//})

 function insert_Token(sessionPath) {
     
     var row1 = new Token({
         session : sessionPath
     });


     row1.save(function (err, row1) {
         if (err) return console.error(err);
         console.log(row1 + " saved to Minister collection.");
     });
     }

module.exports = router;