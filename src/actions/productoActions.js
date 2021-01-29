import {
	AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR, 
	DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_EXITO, DESCARGA_PRODUCTOS_ERROR,
	PRODUCTOS_ELIMINAR, PRODUCTO_ELIMINADO_ERROR, PRODUCTO_ELIMINADO_EXITO,
	PRODUCTOS_EDITAR, PRODUCTO_EDITAR_EXITO, PRODUCTO_EDITAR_ERROR, EDITAR_PRODUCTO
} from'../types';
import clienteAxios from'../config/axios';
import Swal from'sweetalert2';

// nuevos productos
export function crearNuevoProductoAction(producto) {
	return async (dispatch) => {
		dispatch (agregarProducto() );

		try {
			//insertar en la API
			await clienteAxios.post('/productos', producto);
			// no errors
			dispatch(agregarProductoExito(producto));
			// alert
			Swal.fire(
				'Correcto',
				'El producto se agrego con exito',
				'success'
			)
			// si hay error
		} catch(error) {
			dispatch(agregarProductoError(true));
			// alerta de error
			Swal.fire({
				icon: 'error',
				title:'Hubo un error',
				text:'Hubo un error, intenta de nuevo'
			})
		}
	}
}

const agregarProducto = () => ({
	type:AGREGAR_PRODUCTO,
	payload: true
});

// exito producto
const agregarProductoExito = (producto) => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto
});

// error
const agregarProductoError = estado => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: estado
})

// DESCARGAR LOS PRODUCTOS DE LA BASE DE DATOS
export function obtenerProductosAction() {
	return async (dispatch) => {
		dispatch(descargarProductos() );

		try {
			const respuesta = await clienteAxios.get('/productos');
			dispatch(descargarProductosExitosa(respuesta.data));
		} catch (error) {
			dispatch (descargaProductosError ())
		}
	}
}

const descargarProductos = () => ({
	type: DESCARGA_PRODUCTOS,
	payload: true
})

const descargarProductosExitosa = productos => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload: productos
})

const descargaProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR,
	payload: true
})

// SELECCIONA Y ELIMINA EL PRODUCTO

export function borrarProductionAction(id) {
	return async (dispatch) => {
		dispatch(productoEliminar(id));
		try {
			const re = await clienteAxios.delete(`/productos/${id}`);
			console.log(re);
			dispatch(eliminarProductoExito());
			Swal.fire(
				'Eliminado!',
				'El producto se elimino correctamente',
				'success'
			)
		} catch (error) {
			console.log(error);
			dispatch(eliminarProductoError());
		}
	}
}

const productoEliminar = id => ({
	type: PRODUCTOS_ELIMINAR,
	payload: id
});

const eliminarProductoExito = () => ({
	type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
	type: PRODUCTO_ELIMINADO_ERROR,
	payload: true
});

// producto en edicion

export function obtenerProductoEditar(producto) {
	return (dispatch) => {
		dispatch(obtenerProductoAction(producto))
	}
}

const obtenerProductoAction = producto => ({
	type: PRODUCTOS_EDITAR,
	payload: producto
})

// editar un producto en la api y en el state
export function editarProductoAction(producto) {
	return async (dispatch) => {
		dispatch(editarProducto());

		try {
			await clienteAxios.put(`/productos/${producto.id}`, producto);
			dispatch(editarProductoExito(producto));
		} catch (error) {
			console.log(error);
			dispatch(editarProductoError());
		}
	}
}

const editarProducto = () => ({
	type: EDITAR_PRODUCTO
})

const editarProductoExito = producto => ({
	type: PRODUCTO_EDITAR_EXITO,
	payload: producto
})

const editarProductoError = () => ({
	type: PRODUCTO_EDITAR_ERROR,
	payload: true
})