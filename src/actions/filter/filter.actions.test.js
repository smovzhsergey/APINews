//Core
import actions from './';
import types from './types';

const sources = [];
const category = 'category';

describe('filter actions: ', () => {
    test('"getSelectedSources" actions creator should produce a corresponding action', () => {
        expect(actions.getSelectedSources(category)).toEqual({
            type:    types.GET_SELECTED_SOURCES,
            payload: category
        });
    });
    test('"getSelectedCategory" actions creator should produce a corresponding action', () => {
        expect(actions.getSelectedCategory(sources)).toEqual({
            type:    types.GET_SELECTED_CATEGORY,
            payload: sources
        });
    });
    test('"resetFilter" actions creator should produce a corresponding action', () => {
        expect(actions.resetFilter()).toEqual({
            type: types.RESET_FILTER
        });
    });
});
