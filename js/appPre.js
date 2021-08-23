// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let cantidadDeCajas = 0;
let precioPegamento = 850;
let precioPastina = 160;
let modelo = '';
let i = 0;

let modYCant = JSON.parse(localStorage.getItem('modYCant'));
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
			<h4 class="titulo-producto">Producto</h4>
			<h4 class="titulo-caja">Caja</h4>
			<h4 class="titulo-precio">Precio x M2</h4>
			<h4 class="titulo-cantidad">Cantidad</h4>
			<h4 class="titulo-precio-total">Precio</h4>
			<div class="borrar" id="borrar${i}" name="${i}">
				<img src="imagenes/borrar.png" alt="tacho de basura" class="img-borrar" >	
		    </div>
			<p class="producto">porcelanato ${modelo.nombre} ${modelo.medida} (codigo: ${modelo.codigo})</p>
			<p class="caja">${modelo.caja} m2</p>
			<p class="precio">$ ${modelo.precio}</p>
			<p class="cantidad">${cantidadReal.toLocaleString('de-DE')} m2 (${cantidadDeCajas.toLocaleString(
			'de-DE'
		)} cajas)</p>
			<p class="precio-total">$ ${preciopiso.toLocaleString('de-DE')}</p>	
		
			</div>
		`);

		if (modelo.pegamento || modelo.pastina) {
			$(`#presupuesto__container${i}`).append(`
			<h4 class="titulo-peg-past">Producto complementario</h4>
			<h4 class="titulo-bolsa">Bolsa</h4>
			<h4 class="titulo-precio-bolsa">Precio por bolsa</h4>
			<h4 class="titulo-cantidad-bolsa">Cantidad</h4>
			<h4 class="titulo-precio-total-bol">Precio</h4>
			`);
		}
		if (modelo.pegamento) {
			precioPeg = Number(precioTotalPegamento(precioPegamento, cantPegamentoPastina).toFixed(2));
			$(`#presupuesto__container${i}`).append(`
			<p class="pegamento">Adhesivo Full-Mix Porcelanato</p>
			<p class="bolsa-peg">30kg</p>
			<p class="precio-peg">$ ${precioPegamento}</p>
			<p class="cantidad-peg">${cantPegamentoPastina.toLocaleString('de-DE')} bolsas</p>
			<p class="precio-total-peg">$ ${precioPeg.toLocaleString('de-DE')}</p>
			`);
		}
		if (modelo.pastina) {
			precioPast = Number(precioTotalPastina(precioPastina, cantPegamentoPastina).toFixed(2));
			$(`#presupuesto__container${i}`).append(`
			<p class="pastina">Pastina Full-Mix</p>
			<p class="bolsa-pastina">1kg</p>
			<p class="precio-past">$ ${precioPastina}</p>
			<p class="cantidad-past">${cantPegamentoPastina.toLocaleString('de-DE')} bolsas</p>
			<p class="precio-total-past">$ ${precioPast.toLocaleString('de-DE')}</p>
			`);
		}
		let precioTotal = Number(precioFinal(preciopiso, precioPeg, precioPast));
		$(`#presupuesto__container${i}`).append(`
			<h4 class="titulo-total-final">Precio Total</h4>
			<p class="total-final">$${precioTotal.toLocaleString('de-DE')}</p>
			`);
		// boton para borrar del presupuesto
		$(`#borrar${i}`).on('click', function () {
			$(this).parent().remove();
			let indiceBorrado = Number($(this).attr('name'));
			console.log(indiceBorrado);
			let indice = 0;
			let nuevoArreglo = [];
			if (modYCant.length == 1) {
				modYCant = [];
				localStorage.setItem('modYCant', JSON.stringify(modYCant));
			} else {
				for (let producto of modYCant) {
					indice++;

					if (indice !== indiceBorrado) {
						nuevoArreglo.push(producto);
						modYCant = [...nuevoArreglo];
					}
				}
				localStorage.setItem('modYCant', JSON.stringify(modYCant));
				console.log(nuevoArreglo);
				console.log(modYCant);
				location.reload();
			}
		});
	});
}

let presupuesto = $('.presupuesto');
presupuesto.append(`
			<h1 class="presupuesto__h1">Presupuestos</h1>
		`);
imprimirPresupuesto();
