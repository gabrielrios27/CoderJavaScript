// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 850;
let precioPastina = 160;
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
			<h5 class="tituloProducto">Producto</h5>
			<h5 class="tituloCaja">Caja</h5>
			<h5 class="tituloPrecio">Precio x M2</h5>
			<h5 class="tituloCantidad">Cantidad</h5>
			<h5 class="tituloPrecioTotal">Precio</h5>
			<p class="producto">porcelanato ${modelo.nombre} ${modelo.medida} (codigo: ${modelo.codigo})</p>
			<p class="caja">${modelo.caja} m2</p>
			<p class="precio">${modelo.precio}</p>
			<p class="cantidad">${cantidadReal.toLocaleString('de-DE')} m2 (${cantidadDeCajas.toLocaleString(
			'de-DE'
		)} cajas)</p>
			<p class="precioTotal">$ ${preciopiso.toLocaleString('de-DE')}</p>	
		
			</div>
		`);
		if (modelo.pegamento || modelo.pastina) {
			$(`#presupuesto__container${i}`).append(`
			<h5 class="tituloPegPast">Producto complementario</h5>
			<h5 class="tituloBolsa">Bolsa</h5>
			<h5 class="tituloPrecioBolsa">Precio por bolsa</h5>
			<h5 class="tituloCantidadBolsa">Cantidad</h5>
			<h5 class="tituloPrecioTotalBol">Precio</h5>
			`);
		}
		if (modelo.pegamento) {
			precioPeg = Number(precioTotalPegamento(precioPegamento, cantPegamentoPastina).toFixed(2));
			$(`#presupuesto__container${i}`).append(`
			<p class="pegamento">Adhesivo Full-Mix Porcelanato</p>
			<p class="bolsaPeg">30kg</p>
			<p class="precioPeg">${precioPegamento}</p>
			<p class="cantidadPeg">${cantPegamentoPastina.toLocaleString('de-DE')} bolsas</p>
			<p class="precioTotalPeg">$ ${precioPeg.toLocaleString('de-DE')}</p>
			`);
		}
		if (modelo.pastina) {
			precioPast = Number(precioTotalPastina(precioPastina, cantPegamentoPastina).toFixed(2));
			$(`#presupuesto__container${i}`).append(`
			<p class="pastina">Pastina Full-Mix</p>
			<p class="bolsaPastina">1kg</p>
			<p class="precioPast">${precioPastina}</p>
			<p class="cantidadPast">${cantPegamentoPastina.toLocaleString('de-DE')} bolsas</p>
			<p class="precioTotalPast">$ ${precioPast.toLocaleString('de-DE')}</p>
			`);
		}
		let precioTotal = Number(precioFinal(preciopiso, precioPeg, precioPast));
		$(`#presupuesto__container${i}`).append(`
			<h4 class="tituloTotalFinal">Precio Total</h4>
			<p class="totalFinal">$${precioTotal.toLocaleString('de-DE')}</p>
			`);
		// <img src="imagenes/${modelo.imagen}" class="presupuesto__img" />
	});
}
let presupuesto = $('.presupuesto');
presupuesto.append(`
			<h1 class="presupuesto__h1">Presupuestos</h1>
		`);
imprimirPresupuesto();
