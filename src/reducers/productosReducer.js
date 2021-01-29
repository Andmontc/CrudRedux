import {
	AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR,
	DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_EXITO, DESCARGA_PRODUCTOS_ERROR,
	PRODUCTOS_ELIMINAR, PRODUCTO_ELIMINADO_ERROR, PRODUCTO_ELIMINADO_EXITO,
	PRODUCTOS_EDITAR, PRODUCTO_EDITAR_EXITO, PRODUCTO_EDITAR_ERROR  
} from'../types';

// Each reducer has their own state
const initialState = {
	productos: [],
	error: false,
	loading: false,
	productoeliminar: null,
	productoeditar: null
}

export default function (state = initialState, action) {
	switch(action.type) {
		case DESCARGA_PRODUCTOS:
		case AGREGAR_PRODUCTO:
			return {
				...state,
				loading:action.payload
			}
		case AGREGAR_PRODUCTO_EXITO:
			return {
				...state,
				loading:false,
				productos: [...state.productos, action.payload]
			}
		case PRODUCTO_ELIMINADO_ERROR:
		case DESCARGA_PRODUCTOS_ERROR:
		case AGREGAR_PRODUCTO_ERROR:
		case PRODUCTO_EDITAR_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case DESCARGA_PRODUCTOS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				productos: action.payload
			}
		case PRODUCTOS_ELIMINAR:
			return {
				...state,
				productoeliminar: action.payload
			}
		case PRODUCTO_ELIMINADO_EXITO:
			return {
				...state,
				productos: state.productos.filter( producto => producto.id !== state.productoeliminar),
				productoeliminar: null
			}
		case PRODUCTOS_EDITAR:
			return {
				...state,
				productoeditar: action.payload
			}
		case PRODUCTO_EDITAR_EXITO:
			return {
				...state,
				productoeditar: null,
				productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload :
					producto
				)
			}
		default:
			return state;
	}
}
