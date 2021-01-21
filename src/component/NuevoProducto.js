import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//redux actions
import {crearNuevoProductoAction} from '../actions/productoActions';

const NuevoProducto = ({history}) => {

	//useState
	const [nombre, guardarNombre] = useState('');
	const [precio, guardarPrecio] = useState(0);

	//useDispatch
	const dispatch = useDispatch();

	// store state
	const cargando = useSelector(state => state.productos.loading );
	const error = useSelector(state => state.productos.error);

	const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

	const submitNuevoProducto = e => {
		e.preventDefault();

		//validar
		if (nombre.trim() === '' || precio <= 0) {
			return;
		}
		//errores

		//crear nuevo producto
		agregarProducto({
			nombre,
			precio
		});

		//redireccionar al home
		history.push('/');
	}

	return ( 
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">Agregar nuevo producto</h2>
						<form
							onSubmit={submitNuevoProducto}
						>
							<div className="form-group">
								<label>Nombre Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="Nombre"
									value={nombre}
									onChange={e =>guardarNombre(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Precio Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="Precio"
									value={precio}
									onChange={e =>guardarPrecio(Number(e.target.value))}
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
								Agregar
							</button>
						</form>
						{cargando ? <p>Cargando...</p> : null}
						{error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un Error</p> : null}
					</div>
				</div>
			</div>
		</div>
	 );
}
 
export default NuevoProducto;