const jsonModel = require('../models/jsonModel'); // Requiero las funciones del objeto literal que hice en JsonModels
const productModel = jsonModel('productsDataBase') // Creo una variable objeto literal donde le mando por parámetro el json.


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		// Do the magic
		const products = productModel.leerJson();
		return res.render('products', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		// Busco el producto que viene por parámetro en el GET
		const idBuscado = req.params.productId;

		//Ahoralo que hago es buscar por ID
		const products = productModel.findById(idBuscado);

		return res.render('detail', {products});
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		//console.log(req.body);
		productModel.newProduct(req.body);

		return res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const idBuscado = req.params.productId;
	
		//Ahoralo que hago es buscar por ID
		const products = productModel.findById(idBuscado);

		return res.render('product-edit-form', {products});
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let idModificar = req.params.productId.replace(' ','');
		
		productModel.edit(req.body, idModificar);
		
		return res.redirect('/products/detail/'+ idModificar);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		console.log('Entó al destroy');
		console.log('Paso por acá con el id: ' + req.params.productId);
		productModel.deleteProduct(req.params.productId);
		return res.redirect('/');
	}
};

module.exports = controller;