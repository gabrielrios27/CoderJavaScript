// calculador de calculo de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 850;
let precioPastina = 160;
let modelo = '';
let verificador1 = false;
let verificador2 = true;
let codViejo = 0;
let porcelanatos = [];

const dataPorc = 'data/porcelanatos.json';

class Complementario {
	constructor(nombre, bolsa, precio) {
		this.nombre = nombre;
		this.bolsa = bolsa;
		this.precio = Number(precio);
	}
	cantidad(cantidad) {
		return Math.ceil(cantidad / 4);
	}
}

const pegamento = new Complementario('Pegamento FULL-MIX porcelanato', '30kg', 850);
const pastina = new Complementario('Pastina FULL-MIX', '1kg', 160);

// base de datos de los porcelanatos
$.getJSON(dataPorc, function (respuesta, estado) {
	if (estado === 'success') {
		porcelanatos = respuesta;
	}
});
// cargo la eleccion del porcelanato desde el index
const eleccion = JSON.parse(localStorage.getItem('eleccion'));
console.log(eleccion);
// si eleccion no es 0 cargo en el imput
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
			console.log(verificador1);
		}
	}
	if (i == 0) {
		verificador1 = false;
		console.log(verificador1);
	}

	if (!verificador1) {
		$('#alerta-mod').animate(
			{
				'font-size': '12px',
				height: '24px',
				opacity: '1',
				padding: '5px',
			},
			'fast',
			function () {
				$('#codigo').css({ color: 'red' });
				$('#flecha1').fadeIn();
			}
		);
		verificador1 = false;
	} else {
		$('#alerta-mod').animate(
			{
				'font-size': '0px',
				height: '0px',
				opacity: '0',
				padding: '0',
			},
			'fast',
			function () {
				$('#codigo').css({ color: 'black' });
				$('#flecha1').fadeOut();
			}
		);
	}

	if (metrosCuadrados <= 0 || !metrosCuadrados) {
		$('#alerta-cant').animate(
			{
				'font-size': '12px',
				height: '44px',
				opacity: '1',
				padding: '5px',
			},
			'fast',
			function () {
				$('#cantidad').css({ color: 'red' });
				$('#flecha2').fadeIn('fast');
			}
		);
		verificador2 = false;
	} else {
		$('#alerta-cant').animate(
			{
				'font-size': '0px',
				height: '0px',
				opacity: '0',
				padding: '0',
			},
			'fast',
			function () {
				$('#cantidad').css({ color: 'black' });
				$('#flecha2').fadeOut('fast');
			}
		);
		verificador2 = true;
	}
	if (verificador1 && verificador2) {
		$('.info').css({ 'background-color': 'rgb(19, 19, 19)' });
		modelo.cantidad = metrosCuadrados;
		// calculo el calculo
		let cantidadReal = Number(cantidad(modelo.cantidad).toFixed(2));
		let preciopiso = Number(precioPorcelanato(cantidadReal).toFixed(2));
		let presupuesto = $('.calculo');
		$('.calculo__container').remove();
		presupuesto.append(`
			<div class="calculo__container" id="calculo__container">		
				<p class="calculo__info">
				Por ${cantidadReal.toLocaleString(
					'de-DE'
				)}m2 (${cantidadDeCajas.toLocaleString()} cajas) de porcelanato ${modelo.nombre} ${
			modelo.medida
		} el precio es de: $${preciopiso.toLocaleString('de-DE')}
				</p>
			</div>
		`);
		// check y calculo de pastina y pegamento
		let precioPeg = 0;
		let precioPast = 0;

		if ($('#check-pegamento').prop('checked')) {
			precioPeg = Number(
				precioTotalPegamento(pegamento.precio, pegamento.cantidad(cantidadReal)).toFixed(2)
			);
			$('#calculo__container').append(`
			<p class="calculo__info">Por ${pegamento
				.cantidad(cantidadReal)
				.toLocaleString('de-DE')} bolsas de ${pegamento.nombre} de ${
				pegamento.bolsa
			} el precio es de: $${precioPeg.toLocaleString('de-DE')}</p>
			`);
			modelo.pegamento = true;
		}
		if ($('#check-pastina').prop('checked')) {
			precioPast = Number(
				precioTotalPastina(pastina.precio, pastina.cantidad(cantidadReal)).toFixed(2)
			);
			$('#calculo__container').append(`
			<p class="calculo__info">Por ${pastina.cantidad(cantidadReal).toLocaleString('de-DE')} bolsas de ${
				pastina.nombre
			} de ${pastina.bolsa},  el precio es de: $${precioPast.toLocaleString('de-DE')}</p>
			`);
			modelo.pastina = true;
		}
		// calculo del precio total
		let precioTotal = precioFinal(preciopiso, precioPeg, precioPast);
		$('#calculo__container').append(`
		<p class="calculo__info">El precio total es de : $${precioTotal.toLocaleString('de-DE')}</p>	
		`);
		// cambio la seccion info
		let info = $('.info');
		$('.info__container').remove();
		info.append(`
		<div class="info__container">
			<h1 class="info__nombre" id="porc-nombre">Porcelanato ${modelo.nombre}</h1>
			<h4 class="info__detalle" id="porc-medida">Medida: ${modelo.medida}</h4>
			<h4 class="info__detalle" id="porc-caja">Metros cuadrados por caja: ${modelo.caja} m2</h4>
			<h4 class="info__detalle" id="porc-precio">Precio x m2: $${modelo.precio.toLocaleString(
				'de-DE'
			)}</h4>
			<img src="imagenes/${modelo.imagen}" class="info__img" />
		</div>
		`);
		// cargo el producto elegido al arreglo en localStorage para el carrito
		const modYCant1 = JSON.parse(localStorage.getItem('modYCant'));
		console.log(modYCant1);
		if (modYCant1 == null) {
			const modYCant = [];
			modYCant.push(modelo);
			localStorage.setItem('modYCant', JSON.stringify(modYCant));
			console.log(modYCant);
		} else {
			modYCant1.push(modelo);
			localStorage.setItem('modYCant', JSON.stringify(modYCant1));
			console.log(modYCant1);
		}
	} else {
		$('.info__container').remove();
		$('.info').css({ 'background-color': 'rgb(252, 252, 252)' });
	}
}
function ingresaCod(value) {
	let i = 0;
	for (modelo of porcelanatos) {
		if (modelo.codigo == value) {
			i++;
			$('.info').css({ 'background-color': 'rgb(19, 19, 19)' });
			let presupuesto = $('.calculo');
			$('.calculo__container').remove();
			presupuesto.append(`
				<div class="calculo__container">		
					<img src="imagenes/${modelo.imagen}" class="info__img" />
				</div>
			`);
			// cambio la seccion info
			let info = $('.info');
			info.append('');
			info.append(`
			<div class="info__container">
				<h1 class="info__nombre" id="porc-nombre">Porcelanato ${modelo.nombre}</h1>
				<h4 class="info__detalle" id="porc-medida">Medida: ${modelo.medida}</h4>
				<h4 class="info__detalle" id="porc-caja">Metros cuadrados por caja: ${modelo.caja} m2</h4>
				<h4 class="info__detalle" id="porc-precio">Precio x m2: $${modelo.precio.toLocaleString(
					'de-DE'
				)}</h4>
			</div>
			`);
		}
	}
	if (i == 0) {
		$('.info__container').remove();
		$('.info').css({ 'background-color': 'rgb(252, 252, 252)' });
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
$('.datos__box:first-child').append(
	`<p class="datos__alerta" id="alerta-mod">Usted a ingresado un numero de modelo incorrecto.</p>`
);
$('.datos__box:last').append(
	`<p class="datos__alerta" id="alerta-cant">Usted a ingresado una cantidad de metros cuadrado incorrecta.</p>`
);
// observo el input para tomar cualquier cambio en tiempo real para mostrar el porcelanato elegido
setInterval(cambio, 300);
// calculó el valor cuando se le da click al boton calcular

let btnPre = $('#btn-pre');
btnPre.on('click', mostrar);
