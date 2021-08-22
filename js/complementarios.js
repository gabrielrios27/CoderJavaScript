// clase para crear los productos complementarios a agregar en el presupuesto
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
