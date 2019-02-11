// Core
import { combineReducers } from 'redux';

//Instruments
import search from './search';
import view from './view';
import filter from './filter';
import fetch from './fetch';

export default combineReducers({
    filter,
    search,
    view,
    fetch
});
