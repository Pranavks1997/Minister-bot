const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
var multer = require("multer");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const Db = require('./models/Db')
const TokernController = require('./controllers/TokenController')
const MinisterController = require('./controllers/MinisterController')
const ResultadoController = require('./controllers/ResultadoController')
const AgendaController = require('./controllers/AgendaController')
const ChannelController = require('./controllers/ChannelController')
const ImageUploadController = require('./controllers/image-upload')
const Busboy = require("busboy");


mongoose.Promise = Promise

app.use(cors())
app.use(busboy());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(busboyBodyParser());



// app.post('/api/saveDealerInfo', (req, res) => {
//     // store this on database
//     dealer.find({pacode: req.body.pacode, brand: req.body.brand}).exec((err, data) => {
//         if (err) {
//         } else {
//             console.log(' Save Dealer Response:', data);

//             if(Array.isArray(data) && data.length) {
//                 // Edit
//                 console.log('edit')
//                 dealer.findOneAndUpdate({pacode: req.body.pacode, brand: req.body.brand},req.body).exec((err, data) =>{
//                     if(err){

//                     } else {
//                         console.log('edited dealer',data);
//                     }

//                 })
//             }
//             else {
//                 // insert new record

//                 let newDealer = new dealer(req.body);
//                 newDealer.save((err) => {
//                     if (err) {
//                         throw err;
//                     } else {
//                         dealer.find({}).exec((err, data) => {
//                         });
//                     }
//                 });
//             }
//             // res.send(data);
//         }
//     });



// });



// app.post('/api/token')

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
app.use('/token', TokernController)
app.use('/ministers', MinisterController)
app.use('/agendas', AgendaController)
app.use('/resultados', ResultadoController)
app.use('/channel', ChannelController)
app.use('/image-upload',ImageUploadController)