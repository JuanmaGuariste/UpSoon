const socket = io();

async function createCart() {
	return await fetch('https://upsoona.up.railway.app/api/carts',
		{
			method: 'POST'
		})
		.then(response => response.json())
		.then(cart => {
			return cart.payload._id;
		})
		.catch(error => {
			Swal.fire({
				title: 'Error al crear el carrito',
				icon: 'error'
			});
		});
}

async function addProductToCart(pid, cid) {
	const response = await fetch(`https://upsoona.up.railway.app/api/carts/${cid}/product/${pid}`, {
		method: 'POST'
	});
	if (response.status === 403) {
		Swal.fire({
			title: 'Error al agregar el producto',
			text: 'No es posible agregar un producto propio al carrito.',
			icon: 'error'
		});
	} else if (response.ok) {
		Swal.fire({
			title: 'Producto agregado',
			icon: 'success'
		});
	} else {
		Swal.fire({
			title: 'Error al agregar el producto',
			text: 'Hubo un problema al agregar el producto al carrito',
			icon: 'error'
		});
	}
}

async function deleteProductFromCart(pid, cid) {
	const response = await fetch(`https://upsoona.up.railway.app/api/carts/${cid}/product/${pid}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		Swal.fire({
			title: 'Producto quitado del carrito',
			icon: 'warning'
		})
			.then(() => {
				window.location.reload();
			})
	} else {
		Swal.fire({
			title: 'Error al quitar el producto del carrito',
			text: 'Hubo un problema al quitar el producto del carrito',
			icon: 'error'
		});
	}
}

async function sendProduct(userId) {
	const product = {}
	product.title = document.getElementById('title').value;
	product.description = document.getElementById('description').value;
	product.category = document.getElementById('category').value;
	product.price = document.getElementById('price').value;
	product.code = document.getElementById('code').value;
	product.stock = document.getElementById('stock').value;
	product.status = document.getElementById('status').value;
	product.owner = userId;
	let response = await fetch(`https://upsoona.up.railway.app/api/products`, {
		method: 'POST',
		body: JSON.stringify(product),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	if (response.ok) {
		Swal.fire({
			title: 'Producto agregadocorrectamente',
			text: 'Dirigete a "Mis productos" para verlo',
			icon: 'success'
		})
			.then(() => {
				window.location.reload();
			})
	} else {
		Swal.fire({
			title: 'Error al intentar agregar el producto',
			icon: 'error'
		});
	}
}

async function deleteProduct() {
	const prodId = document.getElementById('id').value;
	let response = await fetch(`https://upsoona.up.railway.app/api/products/${prodId}`, {
		method: 'DELETE'
	})
}

async function deleteOwnProduct(pid) {
	let response = await fetch(`https://upsoona.up.railway.app/api/products/${pid}`, {
		method: 'DELETE'
	})
	if (response.ok) {
		Swal.fire({
			title: 'Producto eliminado correctamente',
			icon: 'success'
		})
			.then(() => {
				window.location.reload();
			})
	} else {
		Swal.fire({
			title: 'Error al intentar eliminar el producto',
			icon: 'error'
		});
	}
}

async function deleteUser(uid) {
	let response = await fetch(`https://upsoona.up.railway.app/api/users/${uid}`, {
		method: 'DELETE'
	})
	if (response.ok) {
		Swal.fire({
			title: 'Usuario eliminado correctamente',
			icon: 'success'
		})
			.then(() => {
				window.location.reload();
			})
	} else {
		Swal.fire({
			title: 'Error al intentar eliminar el usuario',
			icon: 'error'
		});
	}
}

async function setUser(uid, user) {
	const response = await fetch(`https://upsoona.up.railway.app/api/users/${uid}/rol/${user}`, {
		method: 'POST'
	});
	if (response.ok) {
		Swal.fire({
			title: 'Rol de usuario actualizado',
			icon: 'succes'
		})
			.then(() => {
				window.location.reload();
			})
	} else {
		Swal.fire({
			title: 'Error al cambiar el rol del usuario',
			icon: 'error'
		});
	}
}

async function createTicket(cid) {
	const response = await fetch(`https://upsoona.up.railway.app/api/carts/${cid}/purchase`, {
		method: 'POST'
	});
	if (response) {
		Swal.fire({
			title: 'Ticket creado',
			text: 'Se le ha enviado un mail con el ticket de compra',
			icon: 'success'
		})
			.then(() => {
				window.location.href = '/products';
			})
	} else {
		Swal.fire({
			title: 'Error al crear el ticket',
			text: 'Hubo un problema al generar el ticket',
			icon: 'error'
		});
	}

}

async function restorePassword() {
	const { value: email } = await Swal.fire({
		title: 'Restauración de contraseña',
		text: 'Ingrese un email y le enviaremos un link para restaurar la contraseña.',
		input: 'email',
		inputPlaceholder: 'Ingrese su dirección de email',
	})

	if (email) {
		const response = await fetch(`https://upsoona.up.railway.app/api/mails/${email}`, {
			method: 'POST'
		});

		if (response.ok) {
			Swal.fire(`Link de restauración de contraseña enviado al correo: ${email}`)
		} else {
			Swal.fire({
				title: 'Error al restaurar la contraseña',
				text: 'Hubo un problema al restaurar la contraseña',
				icon: 'error'
			});
		}
	}
}

socket.on('totalProducts', (data) => {
	const html = JSON.parse(data).map((elem, index) => {
		return `<div class="product-container2">
			<h2>Producto</h2>
			<p>ID: ${elem._id}</p>
			<p>Título: ${elem.title}</p>
			<p>Descripción: ${elem.description}</p>
			<p>Categoría: ${elem.category}</p>
			<p>Precio: ${elem.price}</p>
			<p>Thumbnail: ${elem.thumbnail}</p>
			<p>Código: ${elem.code}</p>
			<p>Stock: ${elem.stock}</p>
			<p>Estado: ${elem.status}</p>
			<p>Dueño: ${elem.owner}</p>
		</div>`;
	});
	document.getElementById('totalProducts').innerHTML = html.join('');
});