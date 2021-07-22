// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 1200;
let precioPastina = 150;
let modelo = '';
let verificador1 = false;
let verificador2 = true;

// base de datos de los porcelanatos
const porcelanatos = JSON.parse(localStorage.getItem('porcelanatos'));
console.log(porcelanatos);
// cargo la eleccion del porcelanato desde el index
const eleccion = JSON.parse(localStorage.getItem('eleccion'));
console.log(eleccion);
// si eleccion no es null cargo en el imput
if (eleccion !== 0) {
	document.getElementById('codigo').value = eleccion;
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
	let numModelo = Number(document.getElementById('codigo').value);
	let metrosCuadrados = Number(document.getElementById('cantidad').value);
	for (const value of porcelanatos) {
		if (numModelo == value.codigo) {
			modelo = value;
			verificador1 = true;
		}
	}
	if (!verificador1) {
		alert('Usted a ingresado un numero de modelo incorrecto');
	}

	if (metrosCuadrados <= 0 || !metrosCuadrados) {
		alert('Usted a ingresado una cantidad de metros cuadrado incorrecta');
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
		let presupuesto = document.getElementById('presupuesto');
		presupuesto.innerHTML = '';
		let parrafo1 = document.createElement('p');
		let parrafo2 = document.createElement('p');
		let parrafo3 = document.createElement('p');
		let parrafo4 = document.createElement('p');
		parrafo1.textContent = `Por ${cantidadReal}m2 (${cantidadDeCajas} cajas) de porcelanato ${modelo.nombre} ${modelo.medida} el precio es de: $${preciopiso}`;
		parrafo2.textContent = `Por ${cantPegamentopastina} bolsas de pegamento de 30kg el precio es de: $${precioPeg}`;
		parrafo3.textContent = `Por ${cantPegamentopastina} bolsas de pastina de 1kg,  el precio es de: $${precioPast}`;
		parrafo4.textContent = `El precio total es de : $${precioTotal}`;
		presupuesto.appendChild(parrafo1);
		presupuesto.appendChild(parrafo2);
		presupuesto.appendChild(parrafo3);
		presupuesto.appendChild(parrafo4);
		parrafo1.setAttribute('class', 'presupuesto__info');
		parrafo2.setAttribute('class', 'presupuesto__info');
		parrafo3.setAttribute('class', 'presupuesto__info');
		parrafo4.setAttribute('class', 'presupuesto__info');

		let img = document.createElement('img');
		presupuesto.appendChild(img);
		img.setAttribute('src', `imagenes/${modelo.imagen}`);
		img.setAttribute('class', 'presupuesto__img');
		// cambio la seccion info
		document.getElementById('porcNombre').textContent = `Porcelanato ${modelo.nombre}`;
		document.getElementById('porcMedida').textContent = `Medida: ${modelo.medida}`;
		document.getElementById(
			'porcCaja'
		).textContent = `Metros cuadrados por caja: ${modelo.caja} m2`;
		document.getElementById('porcPrecio').textContent = `Precio: $${modelo.precio}`;
	}
}
function ingresaCod(value) {
	for (modelo of porcelanatos) {
		if (modelo.codigo == value) {
			let presupuesto = document.getElementById('presupuesto');
			let img = document.createElement('img');
			presupuesto.appendChild(img);
			img.setAttribute('src', `imagenes/${modelo.imagen}`);
			img.setAttribute('class', 'presupuesto__img');
			// cambio la seccion info
			document.getElementById('porcNombre').textContent = `Porcelanato ${modelo.nombre}`;
			document.getElementById('porcMedida').textContent = `Medida: ${modelo.medida}`;
			document.getElementById(
				'porcCaja'
			).textContent = `Metros cuadrados por caja: ${modelo.caja} m2`;
			document.getElementById('porcPrecio').textContent = `Precio: $${modelo.precio}`;
			console.log(`este es el cambio, seleccion: ${modelo.nombre}`);
		}
	}
}
function cambio() {
	let inputMod = document.getElementById('codigo');
	inputMod.addEventListener('change', ingresaCod(inputMod.value));
}
// observo el input para tomar cualquier cambio en tiempo real para mostrar el porcelanato elegido
setInterval(cambio, 200000000);
// calculo el presupuesto cuando se le da click al boton calcular

let btnPre = document.getElementById('btnPre');
btnPre.addEventListener('click', mostrar);

// $('body').append(`<input type="text"   class="inputsClass">
//                    <input type="number" class="inputsClass">
//                    <select class="inputsClass">
//                         <option value="1" selected >ID 1</option>
//                         <option value="2">ID 2</option>
//                         <option value="3">ID 3</option>
//                     </select>`);
// //Asociamos el evento change a todos los inputs
// $('.inputsClass').change(function () {
// 	// console.log(e.target.value);
// 	console.log(this.value);
// });
