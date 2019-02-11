// Core
import types from './types';

export default Object.freeze({
    fetchSources: () => ({
        type: types.FETCH_SOURCES
    }),
    fetchSourcesSuccess: (sources) => ({
        type:    types.FETCH_SOURCES_SUCCESS,
        payload: sources
    }),
    fetchSourcesFail: (message) => ({
        type:    types.FETCH_SOURCES_FAIL,
        payload: message
    }),
    fetchNews: () => ({
        type: types.FETCH_NEWS
    }),
    fetchNewsSuccess: (news) => ({
        type:    types.FETCH_NEWS_SUCCESS,
        payload: news
    }),
    fetchNewsFail: (message) => ({
        type:    types.FETCH_NEWS_FAIL,
        payload: message
    }),
    fillDefaultSources: (sources) => ({
        type:    types.FILL_DEFAULT_SOURCES,
        payload: sources
    }),
    startFetching: () => ({
        type: types.START_FETCHING
    }),
    stopFetching: () => ({
        type: types.STOP_FETCHING
    })
});
