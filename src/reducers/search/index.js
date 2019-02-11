//Core
import { Map } from 'immutable';

//Instruments
import types from '../../actions/search/types';

const initialState = Map({
    searchValue: ''
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.CHANGE_SEARCH_VALUE:
            return state.set('searchValue', payload);

        case types.CLEAR_SEARCH_VALUE:
            return state.set('searchValue', '');

        default:
            return state;
    }
};
