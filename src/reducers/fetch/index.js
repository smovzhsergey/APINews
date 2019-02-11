//Core
import { Map, List } from 'immutable';

//Instruments
import types from '../../actions/fetch/types';

const initialState = Map({
    defaultNewsSource: List(),
    news:              List(),
    newsSource:        List(),
    isFetching:        false
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.FETCH_SOURCES_SUCCESS:
            return state.merge(state, {
                newsSource: List(payload)
            });

        case types.FETCH_NEWS_SUCCESS:
            return state.update('news', (news) => news.push(...payload));

        case types.FILL_DEFAULT_SOURCES:
            return state.merge(state, {
                defaultNewsSource: List(payload)
            });

        default:
            return state;
    }
};
