function openQRCamera(node) {
	var reader = new FileReader();
	reader.onload = function () {
		node.value = '';
		qrcode.callback = function (res) {
			if (res instanceof Error) {
				alert(
					'No se encuentra ningún QR. Asegúrese de que el código QR esté dentro del marco de la cámara y vuelva a intentarlo.'
				);
			} else {
				node.parentNode.previousElementSibling.value = res;
			}
		};
		qrcode.decode(reader.result);
	};
	reader.readAsDataURL(node.files[0]);
}

function showQRIntro() {
	return confirm('Use la camara para tomar una foto del codigo QR');
}
// https://programmerclick.com/article/36671553427/
