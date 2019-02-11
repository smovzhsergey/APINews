// Core
import types from './types';

export default Object.freeze({
    clearSearchValue: () => ({
        type: types.CLEAR_SEARCH_VALUE
    }),
    changeSearchValue: (value) => ({
        type:    types.CHANGE_SEARCH_VALUE,
        payload: value
    })
});
