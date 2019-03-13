var express = require('express');
var router = express.Router();

//id([especificacion de donde a los numeros]{que tan largo el numero,obligatorio de esa cantidad})
router.get('/:name([a-z]{10})/:id([0-9]{5})', function(req, res){
   res.send('Su id es:'+req.params.id + 'y su nombre es :'+ req.params.name);
});
router.get('/',function(req,res){
   res.send('Puede escribir http://localhost:3000/probando/*su nombre*/*un id* ')
})
router.post('/', function(req, res){
   res.send('POST route on things.');
});


//otras rutas por no poner bien la url
router.get('*',function(req,res){
   res.send("sorry, porfavor ponga su nombre, y un id de longitud de:5");
})
//exportar esto para que se use en el index.js
module.exports = router;