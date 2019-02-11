//Core
import { Map } from 'immutable';

//Instruments
import types from '../../actions/view/types';

const initialState = Map({
    buttonUpVisible:      false,
    filterPanelIsVisible: false,
    isFilterPanelUsed:    false,
    isNewsUpdate:         false,
    newsInView:           10,
    quantityNewNews:      0,
    step:                 10
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.OPEN_FILTER_PANEL:
            return state.merge(state, {
                filterPanelIsVisible: true,
                isFilterPanelUsed:    true
            });

        case types.CLOSE_FILTER_PANEL:
            return state.set('filterPanelIsVisible', false);

        case types.SHOW_BUTTON_UP:
            return state.set('buttonUpVisible', true);

        case types.HIDE_BUTTON_UP:
            return state.set('buttonUpVisible', false);

        case types.ADD_NEWS_IN_VIEW:
            return state.update('newsInView', (val) => val + state.toJS().step);

        case types.RESET_NEWS_IN_VIEW:
            return state.set('newsInView', 10);

        case types.UPDATE_NEWS:
            return state.set('isNewsUpdate', true);

        case types.CLEAR_NEWS_UPDATE:
            return state.set('isNewsUpdate', false);

        case types.SET_QUANTITY_NEW_NEWS:
            return state.set('quantityNewNews', payload);

        default:
            return state;
    }
};
