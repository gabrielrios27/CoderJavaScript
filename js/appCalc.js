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
		$('#alertaMod').animate(
			{
				'font-size': '12px',
				height: '24px',
				opacity: '1',
				padding: '5px',
			},
			'fast',
			function () {
				$('#codigo').css({ color: 'red' });
			}
		);
		verificador1 = false;
	} else {
		$('#alertaMod').animate(
			{
				'font-size': '0px',
				height: '0px',
				opacity: '0',
				padding: '0',
			},
			'fast',
			function () {
				$('#codigo').css({ color: 'black' });
			}
		);
	}

	if (metrosCuadrados <= 0 || !metrosCuadrados) {
		$('#alertaCant').animate(
			{
				'font-size': '12px',
				height: '44px',
				opacity: '1',
				padding: '5px',
			},
			'fast',
			function () {
				$('#cantidad').css({ color: 'red' });
			}
		);
		verificador2 = false;
	} else {
		$('#alertaCant').animate(
			{
				'font-size': '0px',
				height: '0px',
				opacity: '0',
				padding: '0',
			},
			'fast',
			function () {
				$('#cantidad').css({ color: 'black' });
			}
		);
		verificador2 = true;
	}
	if (verificador1 && verificador2) {
		modelo.cantidad = metrosCuadrados;
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

		let cantidadReal = cantidad(metrosCuadrados).toFixed(2);
		let preciopiso = precioPorcelanato(cantidadReal).toFixed(2);
		let presupuesto = $('.presupuesto');
		$('.presupuesto__container').remove();
		presupuesto.append(`
			<div class="presupuesto__container" id="pre-calculo">		
				<p class="presupuesto__info">
				Por ${cantidadReal}m2 (${cantidadDeCajas} cajas) de porcelanato ${modelo.nombre} ${modelo.medida} el precio es de: $${preciopiso}
				</p>
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
			<img src="imagenes/${modelo.imagen}" class="info__img" />
		</div>
		`);
		let cantPegamentoPastina = cantidadPegamentoPastina(cantidadReal);
		let precioPeg = 0;
		let precioPast = 0;
		if ($('#checkPegamento').prop('checked')) {
			precioPeg = precioTotalPegamento(precioPegamento, cantPegamentoPastina).toFixed(2);
			$('#pre-calculo').append(`
			<p class="presupuesto__info">Por ${cantPegamentoPastina} bolsas de pegamento de 30kg el precio es de: $${precioPeg}</p>
			`);
		}
		if ($('#checkPastina').prop('checked')) {
			precioPast = precioTotalPastina(precioPastina, cantPegamentoPastina).toFixed(2);
			$('#pre-calculo').append(`
			<p class="presupuesto__info">Por ${cantPegamentoPastina} bolsas de pastina de 1kg,  el precio es de: $${precioPast}</p>
			`);
		}

		let precioTotal = precioFinal(preciopiso, precioPeg, precioPast);
		$('#pre-calculo').append(`
		<p class="presupuesto__info">El precio total es de : $${precioTotal}</p>	
		`);
	} else {
		$('.presupuesto__container').remove();
	}
}
function ingresaCod(value) {
	let i = 0;
	for (modelo of porcelanatos) {
		if (modelo.codigo == value) {
			i++;
			let presupuesto = $('.presupuesto');
			$('.presupuesto__container').remove();
			presupuesto.append(`
				<div class="presupuesto__container">		
					<img src="imagenes/${modelo.imagen}" class="info__img" />
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
	if (i == 0) {
		$('.presupuesto__container').remove();
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
	`<p class="datos__alerta" id="alertaMod">Usted a ingresado un numero de modelo incorrecto.</p>`
);
$('.datos__box:last').append(
	`<p class="datos__alerta" id="alertaCant">Usted a ingresado una cantidad de metros cuadrado incorrecta.</p>`
);
// observo el input para tomar cualquier cambio en tiempo real para mostrar el porcelanato elegido
setInterval(cambio, 300);
// calculo el presupuesto cuando se le da click al boton calcular

let btnPre = $('#btnPre');
btnPre.on('click', mostrar);
