import {
	AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR 
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