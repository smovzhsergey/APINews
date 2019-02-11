//Core
import { Map, List } from 'immutable';

//Instruments
import types from '../../actions/filter/types';

const initialState = Map({
    selectedCategory: '',
    selectedSources:  List()
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.GET_SELECTED_SOURCES:
            return state.merge(state, {
                selectedCategory: '',
                selectedSources:  List(payload)
            });

        case types.GET_SELECTED_CATEGORY:
            return state.merge(state, {
                selectedCategory: payload,
                selectedSources:  List()
            });

        case types.RESET_FILTER:
            return state.merge(state, {
                selectedCategory: '',
                selectedSources:  List()
            });

        default:
            return state;
    }
};
