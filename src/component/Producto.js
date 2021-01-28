import React from 'react';
import {Link, useHistory} from 'react-router-dom';

//redux
import {useDispatch} from 'react-redux';
import {borrarProductionAction, obtenerProductoEditar} from '../actions/productoActions';
import Swal from 'sweetalert2';


const Producto = ({producto}) => {
	const {nombre, precio, id} = producto

	const dispatch = useDispatch();
	const history = useHistory(); // habilitar history para redireccion

	// confirmar si desea eliminar
	const confirmarEliminarProducto = id => {

		// confirmacion ?
		Swal.fire({
			title: 'Esta Seguro?',
			text: "Esta accion no se puede revertir!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar!',
			cancelButtonText: 'Cancelar'
		  }).then((result) => {
			if (result.isConfirmed) {
				// action
			  	dispatch(borrarProductionAction(id));
			}
		  })

	}
	const redireccionarEdicion = producto => {
		dispatch(obtenerProductoEditar(producto));
		history.push(`/productos/editar/${producto.id}`)
	}

	return ( 
		<tr>
			<td>{nombre}</td>
			<td><span className="font-weight-bold"> ${precio}</span></td>
			<td className="acciones">
				<button
					type= "button"
					onClick={() => redireccionarEdicion(producto)}
					className="btn btn-primary mr-2">
					Editar
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => confirmarEliminarProducto(id)}
					> Eliminar 
				</button>
			</td>
		</tr>
	 );
}
 
export default Producto;