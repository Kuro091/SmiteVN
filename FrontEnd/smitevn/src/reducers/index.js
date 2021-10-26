import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import gods from './gods';

export default combineReducers({
    auth,
    alert,
    gods
});