var express = require('express');
//var JSONData = require('./heros.json');
//var fs = require("fs");
const mysql = require('mysql2'); 

let Heros= {}
//get all heros from the database
Heros.getAll = function(){
	return new Promise (function (resolve, reject){
	//create the connection to database
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'superheroes',
		password: 'ccs#1234'
	});
	let query = 'select * from hero where is_valid = 1';
	//querying the database for results
	connection.query(query,function(err,result, fields){
		if(err){
			console.log(err);
			console.log('ERR :: fetching data from database.');
			reject();
		}
		else{
			//console.log(result);
			//console.log(fields);
			resolve(result);
		}
	    });
    });
}

Heros.saveNew = function(newHeroData){
   // create the connection to database
   return new Promise(function(resolve,reject){
   const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'superheroes',
	  password:'ccs#1234'
	});
	let query = `insert into hero(superhero,publisher,alter_ego,first_appearance,characters,is_valid,update_time) values('${newHeroData.superhero}','${newHeroData.publisher}','${newHeroData.alter_ego}','${newHeroData.first_appearance}','${newHeroData.characters}',1,'${new Date()}')`;	
	//console.log(query);
	connection.query(query,function(err,result,fields){
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});

   });
}

Heros.deletehero = function(deleteHeroData){
	return new Promise(function(resolve,reject){
		 const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'superheroes',
	  password:'ccs#1234'
	});

		 let query = `update hero set is_valid = 0 where id = ${deleteHeroData.id}`;
		 connection.query(query,function(err,result,fields){
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});

	});
}

Heros.viewHero = function(viewHeroData){
	return new Promise(function(resolve,reject){
		 const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'superheroes',
	  password:'ccs#1234'
	});

		 let query = `select * from hero where id = ${viewHeroData.id}`;
		 connection.query(query,function(err,result,fields){
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});

	});
}

Heros.getHeroId = function(value){
	return new Promise(function(resolve , reject){
         const connection = mysql.createConnection({
			//Establishing connection
  			host: 'localhost',
  			user: 'root',
  			database: 'superheroes',
  			password: 'ccs#1234'
		 });	

		let query= `select * from hero where id = ${value.id}`;
		connection.query(query, function(err, result, fields){
		//it execute in  mysql and return the result;function() is a callback function 
			if(err){
				console.log(err);
				reject();
			}
			else{
			//console.log(result);//displaying on console
			//console.log(fields);
			resolve(result);
			}
		});

	});
}

Heros.update = function(newHeroData){
	return new Promise(function(resolve , reject){
	const connection = mysql.createConnection({
			//Establishing connection
  			host: 'localhost',
  			user: 'root',
  			database: 'superheroes',
  			password: 'ccs#1234'
		 });
	
	let query= `update hero set superhero ='${newHeroData.superhero}', publisher ='${newHeroData.publisher}', alter_ego='${newHeroData.alter_ego}', first_appearance ='${newHeroData.first_appearance}',characters= '${newHeroData.characters}', 
	          is_valid= 1,update_time='${new Date()}' where id = '${newHeroData.id}'`;
	console.log(query)
	connection.query(query, function(err, result, fields){
		//it execute in  mysql and return the result;function() is a callback function 
			if(err){
				console.log(err);
				reject();
			}
			else{
			console.log(result);//displaying on console
			//console.log(fields);
			resolve(result);
			
			}
		});
})
}

module.exports = Heros;
