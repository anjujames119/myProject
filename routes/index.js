var express = require('express');
var router = express.Router();
var Heros = require('../models/heros.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Superheroes' });
});

router.get('/saveData', function(req, res, next) {
	//console.log(req.query);
	//res.send(req.query);
  Heros.saveNew(req.query)
  	.then (function(){
  res.redirect('/getAllHeros');
	})
	.catch(console.log('ERR : in resolving the promise'))
});

router.get('/getAllHeros', function(req, res, next) {
	Heros.getAll()
	.then (function(retVal){
  res.render('heros', {data: retVal});
})
	.catch(console.log('ERR :: in resolving the promise'))
});


router.get('/Delete', function(req, res, next) {
	Heros.deletehero(req.query)
	.then(function(){
		res.redirect('/getAllHeros')
	})
	 .catch(console.log('ERR:: In resolving the promise')) 
});


router.get('/View', function(req, res, next) {
	Heros.viewHero(req.query)
	.then(function(retVal){
		res.render('view', { data: retVal});
	})
	.catch(console.log('ERR:: In resolving the promise')) 
});

router.get('/Update', function(req,res,next){
	Heros.getHeroId(req.query)
	.then(function(retVal){
	res.render('update' ,{data:retVal})
    })
    .catch(console.log('ERR:Updating data from database'))
});
router.get('/updateHero', function(req,res,next){
	Heros.update(req.query)
	.then(function(){
	res.redirect('/getAllHeros')
    })
    .catch(console.log('ERR:Updating data from database'))
});


module.exports = router;
