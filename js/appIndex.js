// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let orden = 1; //para que los porcelanatos se muestren en orden por precio en la consola: 1-ascendente; 2-descendente
let eleccion = 0;
const dataPorc = "data/porcelanatos.json";
let porcelanatos = [];
// funciones
function imprimirPorc() {
	$('.galeria__container').remove();
	$.getJSON(dataPorc, function (respuesta, estado) {
		if(estado === "success"){
		  porcelanatos = respuesta;
		  porcelanatos.forEach((porc) => {
			let galeria = $('#galeria');
			galeria.append(`
			<div class="galeria__container">
				<a class="galeria__enlace" href="calculador.html" id="codigo${porc.codigo}">
					<img src="imagenes/${porc.imagen}" class="galeria__img">
						<h3 class="galeria__titulo">Porcelanato ${porc.nombre}</h3>
						<p class="galeria__codigo">Codigo: ${porc.codigo}</p>
						<p class="galeria__elegir">Elegir y Calcular</p>
				</a>
			</div>
			`);
			console.log("galeria creada con peticion AJAX")
			$(`#codigo${porc.codigo}`).on('click', function () {
				const elecJson = JSON.stringify(porc.codigo);
				localStorage.setItem('eleccion', elecJson);
			});
		});
		}
		});
	
}
function ascendente(a, b) {
	return a.codigo - b.codigo;
}
function descendente(a, b) {
	return b.codigo - a.codigo;
}

// ordeno los productos de menor a mayor precio y los muestro por consola
console.log('Porcelanatos:');
if (orden == 1) {
	const ordenAscendente = porcelanatos.sort(ascendente);
	for (const producto of ordenAscendente) {
		console.log(
			`Codigo: ${producto.codigo} - ${producto.nombre} ${producto.medida}: $${producto.precio}`
		);
	}
} else {
	const ordenDescendente = porcelanatos.sort(descendente);
	for (const producto of ordenDescendente) {
		console.log(`${producto.nombre} ${producto.medida}: $${producto.precio}`);
	}
}
// creo una lista de productos de mi array
imprimirPorc();

// boton para ver fotos de casas

$( document ).ready(function() {
	const dataCeram = "data/ceramicos.json"; 

    $('body').append(`<div class="boton">
	<button id="btn__ceram">Ver proximos ceramicos</button>
	</div>`);

    $("#btn__ceram").click(() => {
		
        $.ajax({
            method: "GET",
            url:  dataCeram,
            success: function(respuesta){
				let ceramicos = respuesta;
                ceramicos.forEach((ceram) => {
					let galeria = $('#galeria');
					galeria.append(`
					<div class="galeria__container" id="galeria__ceramicos">
							<img src="imagenes/${ceram.imagen}" class="galeria__img">
							<h3 class="galeria__titulo">Ceramico ${ceram.nombre}</h3>
							<p class="galeria__codigo">Medida: ${ceram.medida}</p>
							<p class="galeria__elegir galeria__elegir--prox">Proximamente</p>
					</div>
					`);
					console.log("galeria creada con peticion AJAX")
					
				})
            }
        });
    	$('#btn__ceram').remove(); 
	});
});

	
