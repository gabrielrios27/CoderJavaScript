// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 800;
let precioPastina = 150;
let modelo = '';
let i = 0;

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
let precioTotalPegamento = (precioPegamento, cantPegamentoPastina) => {
	let pegamentoFinal = precioPegamento * cantPegamentoPastina;
	console.log(`El precio total del pegamento es de $${pegamentoFinal}`);
	return pegamentoFinal;
};
let precioTotalPastina = (precioPastina, cantPegamentoPastina) => {
	let pastinaFinal = precioPastina * cantPegamentoPastina;
	console.log(`El precio total de la pastina es de $${pastinaFinal}`);
	return pastinaFinal;
};
function precioFinal(preciopiso, precioTotalPegamento, precioTotalPastina) {
	return preciopiso + precioTotalPegamento + precioTotalPastina;
}

function imprimirPresupuesto() {
	console.log(modYCant);
	modYCant.forEach((porc) => {
		modelo = porc;
		console.log(modelo);
		let precioPeg = 0;
		let precioPast = 0;
		i++;

		let cantidadReal = Number(cantidad(porc.cantidad).toFixed(2));
		let preciopiso = precioPorcelanato(cantidadReal);
		let cantPegamentoPastina = cantidadPegamentoPastina(cantidadReal);

		let presupuesto = $('.presupuesto');
		presupuesto.append(`
			<div class="presupuesto__container" id="presupuesto__container${i}">		
				<p class="presupuesto__info">
				Por ${cantidadReal.toLocaleString('de-DE')}m2 (${cantidadDeCajas.toLocaleString(
			'de-DE'
		)} cajas) de porcelanato ${modelo.nombre} ${
			modelo.medida
		} el precio es de: $${preciopiso.toLocaleString('de-DE')}
				</p>
			</div>
		`);
		if (modelo.pegamento) {
			precioPeg = Number(precioTotalPegamento(precioPegamento, cantPegamentoPastina).toFixed(2));
			$(`#presupuesto__container${i}`).append(`
			<p class="presupuesto__info">Por ${cantPegamentoPastina.toLocaleString(
				'de-DE'
			)} bolsas de pegamento de 30kg el precio es de: $${precioPeg.toLocaleString('de-DE')}</p>
			`);
		}
		if (modelo.pastina) {
			precioPast = Number(precioTotalPastina(precioPastina, cantPegamentoPastina).toFixed(2));
			$(`#presupuesto__container${i}`).append(`
			<p class="presupuesto__info">Por ${cantPegamentoPastina.toLocaleString(
				'de-DE'
			)} bolsas de pastina de 1kg,  el precio es de: $${precioPast.toLocaleString('de-DE')}</p>
			`);
		}
		let precioTotal = Number(precioFinal(preciopiso, precioPeg, precioPast));
		$(`#presupuesto__container${i}`).append(`
			<p class="presupuesto__info">El precio total es de : $${precioTotal.toLocaleString('de-DE')}</p>
			<img src="imagenes/${modelo.imagen}" class="presupuesto__img" />
			`);
	});
}
imprimirPresupuesto();
