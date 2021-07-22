// calculador de presupuesto de porcelanato para piso con pastina y pegamento

let orden = 1; //para que los porcelanatos se muestren en orden por precio en la consola: 1-ascendente; 2-descendente
let eleccion = 0;
let contador = 0;
const porcelanatos = [];
// clase para productos
class producto {
	constructor(codigo, nombre, material, medida, caja, precio, imagen) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.material = material;
		this.medida = medida;
		this.caja = caja;
		this.precio = precio;
		this.imagen = imagen;
	}
}
// funciones
function cargar(nombre, material, medida, caja, precio, img) {
	contador++;
	// cargo mis productos en el array
	porcelanatos.push(new producto(contador, nombre, material, medida, caja, precio, img));
}
function imprimirPorc() {
	porcelanatos.forEach((porc) => {
		let galeria = document.getElementById('galeria');
		let img = document.createElement('img');
		img.setAttribute('src', `imagenes/${porc.imagen}`);
		img.setAttribute('class', 'galeria__img');
		let h3 = document.createElement('h3');
		h3.setAttribute('class', 'galeria__titulo');
		h3.textContent = `Porcelanato ${porc.nombre}`;
		let parr = document.createElement('p');
		parr.setAttribute('class', 'galeria__codigo');
		parr.textContent = `Codigo: ${porc.codigo}`;
		let elegir = document.createElement('p');
		elegir.setAttribute('class', 'galeria__elegir');
		elegir.textContent = `Elegir y Calcular`;
		let enlace = document.createElement('a');
		enlace.setAttribute('class', 'galeria__enlace');
		enlace.setAttribute('href', 'calculador.html');
		enlace.setAttribute('id', `codigo${porc.codigo}`);
		let div = document.createElement('div');
		div.setAttribute('class', `galeria__container`);
		div.appendChild(enlace);
		enlace.appendChild(img);
		enlace.appendChild(h3);
		enlace.appendChild(parr);
		enlace.appendChild(elegir);
		galeria.appendChild(div);
	});
}
function ascendente(a, b) {
	return a.codigo - b.codigo;
}
function descendente(a, b) {
	return b.codigo - a.codigo;
}
// carga de productos
cargar('Carrara', 'Porcelanato', '60x120', 1.44, 5000, 'carrara.jpg');
cargar('Onix', 'Porcelanato', '60x60', 1.44, 4200, 'onix.jpg');
cargar('Bauhaus', 'Porcelanato', '58x58', 1.35, 2800, 'bauhaus.jpg');
cargar('Linen', 'Porcelanato', '60x60', 1.44, 2900, 'linen.jpg');
cargar('Artec', 'Porcelanato', '60x60', 1.44, 2700, 'artec.jpg');
cargar('Calacata', 'Porcelanato', '60x60', 1.44, 4300, 'calacata.jpg');
cargar('Amur', 'Porcelanato', '60x60', 1.44, 3750, 'amur.jpg');
cargar('Porfido', 'Porcelanato', '58x58', 1.35, 3200, 'porfido.jpg');
cargar('Oxidum', 'Porcelanato', '60x60', 1.44, 4200, 'oxidum.jpg');
cargar('Cleveland', 'Porcelanato', '23x120', 1.12, 4500, 'cleveland.jpg');
cargar('Muse', 'Porcelanato', '50x100', 1, 4700, 'muse.jpg');
cargar('Vermont', 'Porcelanato', '15x90', 0.95, 4400, 'vermont.jpg');
// guardo el arreglo en el localStorage
const porcJson = JSON.stringify(porcelanatos);
localStorage.setItem('porcelanatos', porcJson);
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

// capturo el codigo del porcelanato elegido

let imgBox = document.querySelectorAll('.galeria__enlace');

for (let i = 0; i < imgBox.length; i++) {
	// pasamos el evento como parametro con `e`
	imgBox[i].addEventListener('click', function (e) {
		//accedemos a la propiedad target del evento
		eleccion = i + 1;
		// guardo el codigo elegido en el localStorage
		const elecJson = JSON.stringify(eleccion);
		localStorage.setItem('eleccion', elecJson);

		console.log(`se le dio click a ${eleccion}`);
	});
}
