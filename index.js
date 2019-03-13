const functions =require('firebase-functions');
const admin =requiere('firebase-admin');
admin.initializaApp();
var express = require('Express');
var app = express();



// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
   // Grab the text parameter.
   const original = req.query.text;
   // Push the new message into the Realtime Database using the Firebase Admin SDK.
   return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
     return res.redirect(303, snapshot.ref.toString());
   });
 });
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });







/*var probando = require('./probando.js');
app.get('/', function(req, res){
   res.send('Hola Como estas Mi Nombre es Hola Mundo');
});
//both index.js and things.js should be in same directory
app.use(function(req, res, next){
    console.log("Start");
    next();
 });
 app.get('/', function(req, res, next){
    res.send("Middle");
    next();
 });
 
/* app.use('/', function(req, res){
    console.log('End');
 });
 
 app.use(function(req, res, next){
    console.log("A new request received at " + Date.now());
    next();
 });
app.use('/probando', probando);

app.listen(3000);*/