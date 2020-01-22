const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Minister = mongoose.model('Minister')
const Db = require('../models/Db')
const multer = require("multer");

const dialogflow = require('dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(sessionToken, message) {
    // A unique identifier for the given session
    //const sessionId = uuid.v4();
    projectId = 'minister-lgkdat';
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./Minister-66fd4df61571.json"
    });
    //const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionToken,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: message,
          // The language used by the client (en-US)
          languageCode: "en-US"
        }
      }
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }
    return result;
}


router.post('/chat',(req,res)=>{
    ministerId = req.body.id;
    sessionToken = req.body.token;
    QueryInput = req.body.message;
    console.log("here now");

    resultResponse = runSample(sessionToken, QueryInput).then(resp =>{
       res.send(resp);
    }).catch(err=>{
        const error = {
            status:false,
            error: err.message
        }
        res.send(error)
    })

   


    
})

// GET all ministers
router.get('/', (req, res) => {
   // insert_minister_record();
   // var myFunc = runSample();
     Db.Minister.find({
       Status: "Active"
     }).exec((err, data) => {
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
    

    /*myFunc.then(response=> {
        console.log('Promise resolved');
        console.log(response);
        //res.send(response);
        if (response === "Get misters list") {
         
        }
       
    }).catch(function () {
        console.log('Promise rejected');
    });*/
    
     
      
})




function insert_minister_record() {
    //setting
    var row1 = new Minister({
        Name: 'Minister 2',
        Image: 'Hello',
        ID: 25,
        Description: 'desc',
        Order: 5,
        Status: 'Active'
    });

    // save model to database
    row1.save(function (err, row1) {
        if (err) return console.error(err);
        console.log(row1.Name + " saved to Minister collection.");
    });
}

module.exports = router;