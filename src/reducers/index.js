import {combineReducers} from'redux';
import productosReducer from './productosReducer';

// combine state
export default combineReducers({
	productos: productosReducer
})