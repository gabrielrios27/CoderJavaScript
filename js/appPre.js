// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 1200;
let precioPastina = 150;
let modelo = '';

const modYCant = JSON.parse(localStorage.getItem('modYCant'));
// funciones
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


function imprimirPresupuesto() {
	console.log(modYCant);
	modYCant.forEach((porc) => {
		modelo=porc;
		console.log(modelo)
		let cantidadReal = cantidad(porc.cantidad).toFixed(2);
		let preciopiso = precioPorcelanato(cantidadReal);
		let cantPegamentopastina = cantidadPegamentoPastina(cantidadReal);
		let precioPeg = precioTotalPegamento(precioPegamento, cantPegamentopastina);
		let precioPast = precioTotalPastina(precioPastina, cantPegamentopastina);
		let precioTotal = precioFinal(preciopiso, precioPeg, precioPast);

		let presupuesto = $('.presupuesto');
		presupuesto.append(`
			<div class="presupuesto__container presu__container">		
				<p class="presupuesto__info presunuev__info">
				Por ${cantidadReal}m2 (${cantidadDeCajas} cajas) de porcelanato ${modelo.nombre} ${modelo.medida} el precio es de: $${preciopiso}
				</p>
				<p class="presupuesto__info presunuev__info">Por ${cantPegamentopastina} bolsas de pegamento de 30kg el precio es de: $${precioPeg}</p>
				<p class="presupuesto__info presunuev__info">Por ${cantPegamentopastina} bolsas de pastina de 1kg,  el precio es de: $${precioPast}</p>
				<p class="presupuesto__info presunuev__info">El precio total es de : $${precioTotal}</p>
				<img src="imagenes/${modelo.imagen}" class="presu__img" />
			</div>
		`);

		
		$(`#codigo${porc.codigo}`).on('click', function () {
			const elecJson = JSON.stringify(porc.codigo);
			localStorage.setItem('eleccion', elecJson);
		});
	});
}
imprimirPresupuesto();

