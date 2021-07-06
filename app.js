// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 1200;
let precioPastina = 150;
let modelo = '';

// datos que ingresa el cliente
let orden = Number(
	prompt(
		'Elija el orden en que se mostraran los porcelanato pór consola: de menor a mayor precio presione 1 ; de mayor a menor presione 2'
	)
);
let numModelo = Number(
	prompt(
		'Elija un porcelanato: para Carrara 60x120 presione 1 ; para Onix 60x60 presione 2 ; para Bauhaus 58x58 presione 3'
	)
);
let metrosCuadrados = Number(prompt('Ingrese la cantidad de metros cuadrados a cubrir'));

// validacion
while (orden != 1 && orden != 2) {
	alert('Usted a ingresado un numero de ordenamiento incorrecto');
	orden = Number(
		prompt(
			'Elija el orden en que se mostraran los porcelanato pór consola: de menor a mayor precio escriba 1 ; de mayor a menor precio escriba 2'
		)
	);
}
while (numModelo != 1 && numModelo != 2 && numModelo != 3) {
	alert('Usted a ingresado un numero de modelo incorrecto');
	numModelo = Number(
		prompt(
			'Elija un porcelanato: para Carrara 60x120 presione 1 ; para Onix 60x60 presione 2 ; para Bauhaus 58x58 presione 3'
		)
	);
}
while (metrosCuadrados <= 0 || !metrosCuadrados) {
	alert('Usted a ingresado una cantidad de metros cuadrado incorrecta');
	metrosCuadrados = Number(prompt('Ingrese la cantidad de metros cuadrados a cubrir'));
}

// clase para productos
class producto {
	constructor(nombre, medida, caja, precio, imagen) {
		this.nombre = nombre;
		this.medida = medida;
		this.caja = caja;
		this.precio = precio;
		this.imagen = imagen;
	}
	foto() {
		document.write(
			`<h1>${modelo.nombre}</h1><img src="imagenes/${this.imagen}" alt="porcelanato ${this.nombre}">`
		);
	}
}

// carga de productos - creacion de objetos
const carrara = new producto('Carrara', '60x120', 1.44, 5000, 'carrara.jpg');
const onix = new producto('Onix', '60x60', 1.44, 4200, 'onix.jpg');
const bauhaus = new producto('Bauhaus', '58x58', 1.35, 2800, 'bauhaus.jpg');
// cargo mis productos en el array
const porcelanatos = [carrara, onix, bauhaus];
// cargo el modelo elegido
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

// funciones
function ascendente(a, b) {
	return a.precio - b.precio;
}
function descendente(a, b) {
	return b.precio - a.precio;
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

// ordeno los productos de menor a mayor precio y los muestro por consola
console.log('Porcelanatos:');
if (orden == 1) {
	const ordenAscendente = porcelanatos.sort(ascendente);
	for (const producto of ordenAscendente) {
		console.log(`${producto.nombre} ${producto.medida}: $${producto.precio}`);
	}
} else {
	const ordenDescendente = porcelanatos.sort(descendente);
	for (const producto of ordenDescendente) {
		console.log(`${producto.nombre} ${producto.medida}: $${producto.precio}`);
	}
}
// procesamiento de datos-llamo a las funciones
let cantidadReal = cantidad(metrosCuadrados).toFixed(2);
let preciopiso = precioPorcelanato(cantidadReal);
let cantPegamentopastina = cantidadPegamentoPastina(cantidadReal);
let precioTotal = precioFinal(
	preciopiso,
	precioTotalPegamento(precioPegamento, cantPegamentopastina),
	precioTotalPastina(precioPastina, cantPegamentopastina)
);

// mensaje en pantalla
alert(
	`Por ${cantidadReal}m2 (${cantidadDeCajas} cajas) de porcelanato ${modelo.medida} + ${cantPegamentopastina} bolsas de pegamento de 30kg + ${cantPegamentopastina} bolsas de pastina de 1kg,  el precio total es de : $${precioTotal}`
);
// muestro foto del modelo elegido
modelo.foto();
