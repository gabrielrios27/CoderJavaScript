// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let orden = 1; //para que los porcelanatos se muestren en orden por precio en la consola: 1-ascendente; 2-descendente
let eleccion = 0;
// clase para productos
class producto {
	constructor(codigo, nombre, medida, caja, precio, imagen) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.medida = medida;
		this.caja = caja;
		this.precio = precio;
		this.imagen = imagen;
		this.cantidad = 0;
	}
}

// carga de productos - creacion de objetos
const carrara = new producto(1, 'Carrara', '60x120', 1.44, 5000, 'carrara.jpg');
const onix = new producto(2, 'Onix', '60x60', 1.44, 4200, 'onix.jpg');
const bauhaus = new producto(3, 'Bauhaus', '58x58', 1.35, 2800, 'bauhaus.jpg');
const linen = new producto(4, 'Linen', '60x60', 1.44, 2900, 'linen.jpg');
const artec = new producto(5, 'Artec', '60x60', 1.44, 2700, 'artec.jpg');
const calacata = new producto(6, 'Calacata', '60x60', 1.44, 4300, 'calacata.jpg');
const amur = new producto(7, 'Amur', '60x60', 1.44, 3750, 'amur.jpg');
const porfido = new producto(8, 'Porfido', '58x58', 1.35, 3200, 'porfido.jpg');
const oxidum = new producto(9, 'Oxidum', '60x60', 1.44, 4200, 'oxidum.jpg');
const cleveland = new producto(10, 'Cleveland', '23x120', 1.12, 4500, 'cleveland.jpg');
const muse = new producto(11, 'Muse', '50x100', 1, 4700, 'muse.jpg');
const vermont = new producto(12, 'Vermont', '15x90', 0.95, 4400, 'vermont.jpg');
// cargo mis productos en el array
const porcelanatos = [
	carrara,
	onix,
	bauhaus,
	linen,
	artec,
	calacata,
	amur,
	porfido,
	oxidum,
	cleveland,
	muse,
	vermont,
];
// guardo el arreglo en el localStorage
const porcJson = JSON.stringify(porcelanatos);
localStorage.setItem('porcelanatos', porcJson);
// funciones
function imprimirPorc() {
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
		$(`#codigo${porc.codigo}`).on('click', function () {
			const elecJson = JSON.stringify(porc.codigo);
			localStorage.setItem('eleccion', elecJson);
		});
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
