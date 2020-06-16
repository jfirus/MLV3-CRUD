const jsonModel = require('../models/jsonModel'); // Requiero las funciones del objeto literal que hice en JsonModels
const productModel = jsonModel('productsDataBase') // Creo una variable objeto literal donde le mando por parámetro el json.


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		// Do the magic
		const visited = productModel.filterbySomething(elemento => {
			return elemento.category == "visited";
		});

		const inSale = productModel.filterbySomething(elemento => {
			return elemento.category == "in-sale";
		});

		return res.render('index',{visited, inSale});
	},
	search: (req, res) => {
		// Do the magic
		const datoABuscar = req.query.keywords;

		// Guardo en resultado todos los elementos del Json que coinciden con mi búsqueda, que es lo que la persona ingresó en keywords
		const products = productModel.filterbySomething(elemento => {
			return elemento.name == datoABuscar;
		});
		return res.render('results', {products, datoABuscar});

	},
};

module.exports = controller;
