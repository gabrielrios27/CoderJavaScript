// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 1200;
let precioPastina = 150;
let modelo = '';
let orden = 1; //para que los porcelanatos se muestren en orden por precio en la consola: 1-ascendente; 2-descendente
let verificador1 = true;
let verificador2 = true;

// clase para productos
class producto {
	constructor(codigo, nombre, medida, caja, precio, imagen) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.medida = medida;
		this.caja = caja;
		this.precio = precio;
		this.imagen = imagen;
	}
}

// carga de productos - creacion de objetos
const carrara = new producto(1, 'Carrara', '60x120', 1.44, 5000, 'carrara.jpg');
const onix = new producto(2, 'Onix', '60x60', 1.44, 4200, 'onix.jpg');
const bauhaus = new producto(3, 'Bauhaus', '58x58', 1.35, 2800, 'bauhaus.jpg');
// cargo mis productos en el array
const porcelanatos = [carrara, onix, bauhaus];

// funciones

function ascendente(a, b) {
	return a.codigo - b.codigo;
}
function descendente(a, b) {
	return b.codigo - a.codigo;
}
function cantidad(metrosCuadrados) {
	cantidadDeCajas = Math.ceil(metrosCuadrados / modelo.caja);
	return cantidadDeCajas * modelo.caja;
}
function precioPorcelanato(cantidad) {
	let pisoFinal = modelo.precio * cantidad;
	console.log(
		`El precio total por ${cantidad}m2 del porcelanato ${modelo.nombre} es de $${pisoFinal}`
	);
	return pisoFinal;
}
function cantidadPegamentoPastina(cantidad) {
	return Math.ceil(cantidad / 4);
}
let precioTotalPegamento = (precioPegamento, cantPegamentopastina) => {
	let pegamentoFinal = precioPegamento * cantPegamentopastina;
	console.log(`El precio total del pegamento es de $${pegamentoFinal}`);
	return pegamentoFinal;
};
let precioTotalPastina = (precioPastina, cantPegamentopastina) => {
	let pastinaFinal = precioPastina * cantPegamentopastina;
	console.log(`El precio total de la pastina es de $${pastinaFinal}`);
	return pastinaFinal;
};
function precioFinal(preciopiso, precioTotalPegamento, precioTotalPastina) {
	return preciopiso + precioTotalPegamento + precioTotalPastina;
}
function mostrar() {
	let numModelo = Number(document.getElementById('codigo').value);
	let metrosCuadrados = Number(document.getElementById('cantidad').value);
	if (numModelo != 1 && numModelo != 2 && numModelo != 3) {
		alert('Usted a ingresado un numero de modelo incorrecto');
		verificador1 = false;
	} else {
		verificador1 = true;
	}
	if (metrosCuadrados <= 0 || !metrosCuadrados) {
		alert('Usted a ingresado una cantidad de metros cuadrado incorrecta');
		verificador2 = false;
	} else {
		verificador2 = true;
	}
	if (verificador1 && verificador2) {
		switch (numModelo) {
			case 1:
				modelo = carrara;
				break;
			case 2:
				modelo = onix;
				break;
			case 3:
				modelo = bauhaus;
				break;
		}
		let cantidadReal = cantidad(metrosCuadrados).toFixed(2);
		let preciopiso = precioPorcelanato(cantidadReal);
		let cantPegamentopastina = cantidadPegamentoPastina(cantidadReal);
		let precioTotal = precioFinal(
			preciopiso,
			precioTotalPegamento(precioPegamento, cantPegamentopastina),
			precioTotalPastina(precioPastina, cantPegamentopastina)
		);
		// modifico el DOM
		let presupuesto = document.getElementById('presupuesto');
		presupuesto.innerHTML = '';
		let parrafo = document.createElement('p');
		parrafo.textContent = `Por ${cantidadReal}m2 (${cantidadDeCajas} cajas) de porcelanato ${modelo.nombre} ${modelo.medida} + ${cantPegamentopastina} bolsas de pegamento de 30kg + ${cantPegamentopastina} bolsas de pastina de 1kg,  el precio total es de : $${precioTotal}`;
		presupuesto.appendChild(parrafo);
		parrafo.setAttribute('class', 'presupuesto__info');
		let img = document.createElement('img');
		presupuesto.appendChild(img);
		img.setAttribute('src', `imagenes/${modelo.imagen}`);
		img.setAttribute('class', 'presupuesto__img');
	}
}
// ordeno los productos de menor a mayor precio y los muestro por consola
console.log('Porcelanatos:');
if (orden == 1) {
	const ordenAscendente = porcelanatos.sort(ascendente);
	for (const producto of ordenAscendente) {
		console.log(
			`Codigo: ${producto.codigo} - ${producto.nombre} ${producto.medida}: $${producto.precio}`
		);
	}
} else {
	const ordenDescendente = porcelanatos.sort(descendente);
	for (const producto of ordenDescendente) {
		console.log(`${producto.nombre} ${producto.medida}: $${producto.precio}`);
	}
}

// Agrego un evento

let btnPre = document.getElementById('btnPre');
btnPre.addEventListener('click', mostrar);
// muestro foto del modelo elegido
