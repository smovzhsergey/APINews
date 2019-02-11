//Core
import actions from './';
import types from './types';

const value = 'value';

describe('search actions: ', () => {
    test('"changeSearchValue" actions creator should produce a corresponding action', () => {
        expect(actions.changeSearchValue(value)).toEqual({
            type:    types.CHANGE_SEARCH_VALUE,
            payload: value
        });
    });
    test('"clearSearchValue" actions creator should produce a corresponding action', () => {
        expect(actions.clearSearchValue()).toEqual({
            type: types.CLEAR_SEARCH_VALUE
        });
    });
});
