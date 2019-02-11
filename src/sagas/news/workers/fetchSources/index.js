//Core
import { call, put } from 'redux-saga/effects';

//Instrument
import { apiKey, apiSources, sourcesForView } from '../../../../instruments/api';
import fetchActions from '../../../../actions/fetch';


export function* fetchSourcesWorker () {
    try {
        const responseSource = yield call(fetch, `${apiSources}${apiKey}`, {
            method: 'GET'
        });

        if (responseSource.status !== 200) {
            throw new Error('Source of news were not loaded.');
        }

        const { sources } = yield call([responseSource, responseSource.json]);
        let selectedSources = [];

        sourcesForView.forEach((el) => {
            selectedSources = [...sources.filter(({ id }) => id === el), ...selectedSources];
        });

        yield put(fetchActions.fetchSourcesSuccess(sources));
        yield put(fetchActions.fillDefaultSources(selectedSources));
        yield put(fetchActions.fetchNews());
    } catch ({ message }) {
        yield put(fetchActions.fetchSourcesFail(message));
    }
}
