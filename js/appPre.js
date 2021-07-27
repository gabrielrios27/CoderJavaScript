// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 1200;
let precioPastina = 150;
let modelo = '';
let verificador1 = false;
let verificador2 = true;
let codViejo = 0;
// base de datos de los porcelanatos
const porcelanatos = JSON.parse(localStorage.getItem('porcelanatos'));
console.log(porcelanatos);
// cargo la eleccion del porcelanato desde el index
const eleccion = JSON.parse(localStorage.getItem('eleccion'));
console.log(eleccion);
// si eleccion no es null cargo en el imput
if (eleccion !== 0) {
	$('#codigo').val(eleccion);
}
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
function mostrar() {
	let numModelo = Number($('#codigo').val());
	console.log(numModelo);
	let metrosCuadrados = Number($('#cantidad').val());
	let i = 0;
	for (let value of porcelanatos) {
		if (numModelo == value.codigo) {
			modelo = value;
			i++;
			verificador1 = true;
			console.log(modelo);
		}
	}
	if (i == 0) {
		verificador1 = false;
	}
	console.log(verificador1);
	$('.datos__alerta').remove();
	if (!verificador1) {
		$('.datos__box:first-child').append(
			`<p class="datos__alerta">Usted a ingresado un numero de modelo incorrecto.</p>`
		);
		verificador1 = false;
	}
	console.log(verificador1);
	if (metrosCuadrados <= 0 || !metrosCuadrados) {
		$('.datos__box:last').append(
			`<p class="datos__alerta">Usted a ingresado una cantidad de metros cuadrado incorrecta.</p>`
		);
		verificador2 = false;
	} else {
		verificador2 = true;
	}
	if (verificador1 && verificador2) {
		let cantidadReal = cantidad(metrosCuadrados).toFixed(2);
		let preciopiso = precioPorcelanato(cantidadReal);
		let cantPegamentopastina = cantidadPegamentoPastina(cantidadReal);
		let precioPeg = precioTotalPegamento(precioPegamento, cantPegamentopastina);
		let precioPast = precioTotalPastina(precioPastina, cantPegamentopastina);
		let precioTotal = precioFinal(preciopiso, precioPeg, precioPast);
		// modifico el DOM
		let presupuesto = $('.presupuesto');
		$('.presupuesto__container').remove();
		presupuesto.append(`
			<div class="presupuesto__container">		
				<p class="presupuesto__info">
				Por ${cantidadReal}m2 (${cantidadDeCajas} cajas) de porcelanato ${modelo.nombre} ${modelo.medida} el precio es de: $${preciopiso}
				</p>
				<p class="presupuesto__info">Por ${cantPegamentopastina} bolsas de pegamento de 30kg el precio es de: $${precioPeg}</p>
				<p class="presupuesto__info">Por ${cantPegamentopastina} bolsas de pastina de 1kg,  el precio es de: $${precioPast}</p>
				<p class="presupuesto__info">El precio total es de : $${precioTotal}</p>
				<img src="imagenes/${modelo.imagen}" class="presupuesto__img" />
			</div>
		`);
		// cambio la seccion info
		let info = $('.info');
		info.append('');
		info.append(`
		<div class="presupuesto__container">
			<h1 class="info__nombre" id="porcNombre">Porcelanato ${modelo.nombre}</h1>
			<h4 class="info__detalle" id="porcMedida">Medida: ${modelo.medida}</h4>
			<h4 class="info__detalle" id="porcCaja">Metros cuadrados por caja: ${modelo.caja} m2</h4>
			<h4 class="info__detalle" id="porcPrecio">Precio x m2: $${modelo.precio}</h4>
		</div>
		`);
	} else {
		$('.presupuesto__container').remove();
	}
}
function ingresaCod(value) {
	for (modelo of porcelanatos) {
		if (modelo.codigo == value) {
			let presupuesto = $('.presupuesto');
			$('.presupuesto__container').remove();
			presupuesto.append(`
				<div class="presupuesto__container">		
					<img src="imagenes/${modelo.imagen}" class="presupuesto__img" />
				</div>
			`);
			// cambio la seccion info
			let info = $('.info');
			info.append('');
			info.append(`
			<div class="presupuesto__container">
				<h1 class="info__nombre" id="porcNombre">Porcelanato ${modelo.nombre}</h1>
				<h4 class="info__detalle" id="porcMedida">Medida: ${modelo.medida}</h4>
				<h4 class="info__detalle" id="porcCaja">Metros cuadrados por caja: ${modelo.caja} m2</h4>
				<h4 class="info__detalle" id="porcPrecio">Precio x m2: $${modelo.precio}</h4>
			</div>
			`);
		}
	}
}
function cambio() {
	let inputMod = $('#codigo');
	console.log(`el codigo nuevo es ${inputMod.val()} y el viejo es ${codViejo}`);
	if (codViejo != inputMod.val()) {
		inputMod.on('change', ingresaCod(inputMod.val()));
		codViejo = inputMod.val();
	}
}
// observo el input para tomar cualquier cambio en tiempo real para mostrar el porcelanato elegido
setInterval(cambio, 300);
// calculo el presupuesto cuando se le da click al boton calcular

let btnPre = $('#btnPre');
btnPre.on('click', mostrar);