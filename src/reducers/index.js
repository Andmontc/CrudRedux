import {combineReducers} from'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';

// combine state
export default combineReducers({
	productos: productosReducer,
	alerta: alertaReducer
});