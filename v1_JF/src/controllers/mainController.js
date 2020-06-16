const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//Función para leer y parsear el json con los datos de los productos
function leerJson (){
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller = {
	root: (req, res) => {
		
		let productos = leerJson ();
		
		//Busco dento de los productos del JSON todos los que corresponden a la categoría "visited" y los guardo dentro de la variable visited
		let visited = productos.filter(function(products){
			return products.category == "visited";
		})
		
		//Busco dento de los productos del JSON todos los que corresponden a la categoría "in-sale" y los guardo dentro de la variable inSale
		let inSale = productos.filter(function(products){
			return products.category == "in-sale";
		})

	//	return res.send(visited);

		return res.render('index', {visited, inSale});

		
	},
	search: (req, res) => {
		// Obtengo el valor que insertó el usuario en el campo de búsqueda
		let datoBuscado = req.query.keywords;
		let productos = leerJson ();
		// EL método indexOf cuando no existe te devuelve un -1
		//console.log('Producto Encontrado? ' + productos[0].name.indexOf(datoBuscado));
		
		/*
		let resultadoBusqueda = [];
		let cantidad =0 ;

		productos.forEach(products => { if (products.name == datoBuscado){
			console.log('Entró al IF con: ' + products.name);
			cantidad = resultadoBusqueda.push(products);
			console.log('Lo que contiene resultado Búsqueda: '+ resultadoBusqueda);
			console.log('Cantidad: ' + cantidad); } 
			else {console.log('No encontró: ' + products.name);}
		});
		*/
		
		const nuevoArrayBusqueda = productos.filter(elemento => elemento.name == datoBuscado);
	
		console.log('Lo que contiene el nuevo Array: ' + nuevoArrayBusqueda)
		console.log('La longitud del nuevo array: '+ nuevoArrayBusqueda.lenght);
		
		res.render('results', {productos: nuevoArrayBusqueda});
	},
};

module.exports = controller;
