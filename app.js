// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 1200;
let precioPastina = 150;
let modelo = '';
// datos que ingresa el cliente
let numModelo = Number(
	prompt(
		'Elija un porcelanato: para Carrara 60x120 presione 1 ; para Onix 60x60 presione 2 ; para Bauhaus 58x58 presione 3'
	)
);
let metrosCuadrados = Number(prompt('Ingrese la cantidad de metros cuadrados a cubrir'));
// let medida = Number(
// 	prompt(
// 		'Elija la medida del porcelanato: para medida 60x60 presione 1 ; para medida 60x120 presione 2'
// 	)
// );
// validacion
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

// while (medida != 1 && medida != 2) {
// 	alert('Usted a ingresado un numero de medida incorrecto');
// 	medida = Number(
// 		prompt(
// 			'Elija la medida del porcelanato: para medida 60x60 presione 1 ; para medida 60x120 presione 2'
// 		)
// 	);
// }
// clase para productos
class producto {
	constructor(nombre, medida, caja, precio) {
		this.nombre = nombre;
		this.medida = medida;
		this.caja = caja;
		this.precio = precio;
	}
	cuotas(cantidadCuotas) {
		switch (cantidadCuotas) {
			case 3:
				this.precio *= 1.15;
				break;
			case 12:
				this.precio *= 1.25;
				break;
			case 18:
				this.precio *= 1.3;
				break;
		}
	}
}
// carga de productos
const carrara = new producto('Carrara', '60x120', 1.44, 5000);
const onix = new producto('Onix', '60x60', 1.44, 4200);
const bauhaus = new producto('Bauhaus', '58x58', 1.35, 2800);
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
function cantidad(metrosCuadrados) {
	cantidadDeCajas = Math.ceil(metrosCuadrados / modelo.caja);
	return cantidadDeCajas * modelo.caja;
}

function precioPorcelanato(cantidad) {
	let pisoFinal = modelo.precio * cantidad;
	console.log(`El precio total del piso es de $${pisoFinal}`);
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
