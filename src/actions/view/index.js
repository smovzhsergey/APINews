// Core
import types from './types';

export default Object.freeze({
    openFilterPanel: () => ({
        type: types.OPEN_FILTER_PANEL
    }),
    closeFilterPanel: () => ({
        type: types.CLOSE_FILTER_PANEL
    }),
    showButtonUp: () => ({
        type: types.SHOW_BUTTON_UP
    }),
    hideButtonUp: () => ({
        type: types.HIDE_BUTTON_UP
    }),
    addNewsInView: () => ({
        type: types.ADD_NEWS_IN_VIEW
    }),
    resetNewsInView: () => ({
        type: types.RESET_NEWS_IN_VIEW
    }),
    updateNews: () => ({
        type: types.UPDATE_NEWS
    }),
    clearNewsUpdate: () => ({
        type: types.CLEAR_NEWS_UPDATE
    }),
    setQuantityNewNews: (quantity) => ({
        type:    types.SET_QUANTITY_NEW_NEWS,
        payload: quantity
    })
});
