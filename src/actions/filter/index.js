// Core
import types from './types';

export default Object.freeze({
    getSelectedSources: (sources) => ({
        type:    types.GET_SELECTED_SOURCES,
        payload: sources
    }),
    getSelectedCategory: (category) => ({
        type:    types.GET_SELECTED_CATEGORY,
        payload: category
    }),
    resetFilter: () => ({
        type: types.RESET_FILTER
    })
});
