//Core
import actions from './';
import types from './types';

const payload = [];
const message = 'error';

describe('fetch actions: ', () => {

    test('"fetchSources" actions creator should produce a corresponding action', () => {
        expect(actions.fetchSources()).toEqual({
            type: types.FETCH_SOURCES
        });
    });
    test('"fetchSourcesSuccess" actions creator should produce a corresponding action', () => {
        expect(actions.fetchSourcesSuccess(payload)).toEqual({
            type: types.FETCH_SOURCES_SUCCESS,
            payload
        });
    });
    test('"fetchSourcesFail" actions creator should produce a corresponding action', () => {
        expect(actions.fetchSourcesFail(message)).toEqual({
            type:    types.FETCH_SOURCES_FAIL,
            payload: message
        });
    });
    test('"fetchNews" actions creator should produce a corresponding action', () => {
        expect(actions.fetchNews()).toEqual({
            type: types.FETCH_NEWS
        });
    });
    test('"fetchNewsSuccess" actions creator should produce a corresponding action', () => {
        expect(actions.fetchNewsSuccess(payload)).toEqual({
            type: types.FETCH_NEWS_SUCCESS,
            payload
        });
    });
    test('"fetchNewsFail" actions creator should produce a corresponding action', () => {
        expect(actions.fetchNewsFail(message)).toEqual({
            type:    types.FETCH_NEWS_FAIL,
            payload: message
        });
    });
    test('"fillDefaultSources" actions creator should produce a corresponding action', () => {
        expect(actions.fillDefaultSources(payload)).toEqual({
            type: types.FILL_DEFAULT_SOURCES,
            payload
        });
    });
    test('"startFetching" actions creator should produce a corresponding action', () => {
        expect(actions.startFetching()).toEqual({
            type: types.START_FETCHING
        });
    });
    test('"stopFetching" actions creator should produce a corresponding action', () => {
        expect(actions.stopFetching()).toEqual({
            type: types.STOP_FETCHING
        });
    });
});