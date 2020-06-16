const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Función para leer y parsear el json con los datos de los productos
function leerJson (){
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

function guardarJson(datosAGuardar){

	fs.writeFileSync(productsFilePath, JSON.stringify(datosAGuardar, 'utf-8'));
	return 0;
}


const controller = {
	// Root - Show all products
	root: (req, res) => {
		
		let productos = leerJson ();
		return res.render('products', {productos});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		let productos = leerJson ();
		
		let product = productos.find(function(productos){
			return productos.id == req.params.productId;
		});

		//let precioFinal = product.price - (product.price * product.discount) /100;
		//Hago el render a la vista de los productos
		return res.render('detail', {product});
	},

	// Create - Form to create
	create: (req, res) => {
		// Método para crear un nuevo producto
		return res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Leo y guardo el jSon con los productos existentes
		let productos = leerJson ();
		// Busco el último id del array y le sumo UNO para que sea el identificador del nuevo producto a grabar
		let nuevoid = productos[productos.length - 1].id + 1;

		
		// Tomo los valores cargados por el usuario en el body
		// Defino un objeto literal con las propiedades de un producto, donde guardaré el nuevo producto creado por el usuario
		let productoNuevo = {
			'id': nuevoid,
			'name': req.body.name,
			'description': req.body.description,
			'price': req.body.price,
			'discount': req.body.discount,
			'image': "default-image.png",
			'category': req.body.category,
		}
		//Agrego al array del JSON leído el producto nuevo
		productos.push(productoNuevo);

		// Reemplazo el Json existente por el nuevo con el nuevo producto
		guardarJson(productos);
		
		// Redirecciono a la página que quiero
		return res.redirect('/');
	},

	// Update - Form to edita
	edit: (req, res) => {
		let productos = leerJson ();
		
		// Obtengo el producto del JSON
		let product = productos.find(function(productos){
			return productos.id == req.params.productId;
		});

		return res.render('product-edit-form', {product});
	},
	// Update - Method to update
	update: (req, res) => {
	
		console.log('entro al update');


		let idProductoModificar = req.params.productId;
		let productoModificado = req.body;
	
		
		let productos = leerJson ();

		// Busco el elemento a modificar
		productos.forEach(element => {if (element.id == idProductoModificar){
			element.name = productoModificado.name;
			element.price= productoModificado.price;
			element.discount = productoModificado.discount;
			element.category = productoModificado.category;
			element.description = productoModificado.description;
		}
		});
		
		//Y ahora deberia grabar el archivo
		guardarJson(productos);
	
		res.redirect('/products/edit/' + req.params.productId);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		console.log('Paso por eldelete');
		// Leo el JSON con los productos
		let productos = leerJson ();
		// Obtengo del parámetro el ID a eliminar
		let idProductoEliminar = req.params.productId;
		
		for (let i=0; i< productos.length ; i++){
			
			if (productos[i].id == idProductoEliminar ){
				productos.splice(i, 1);
			}
		}

		// Reemplazo el Json existente por el nuevo con el nuevo producto
		guardarJson(productos);
		
		// Redirecciono a la página que quiero
		return res.redirect('/');
	}
};

module.exports = controller;