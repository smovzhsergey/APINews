//Core
import { takeEvery } from 'redux-saga/effects';

//Instruments
import types from '../../actions/fetch/types';
import { fetchSourcesWorker } from './workers/fetchSources';
import { fetchNewsWorker } from './workers/fetchNews';

export default Object.freeze({
    * fetchSourcesWatcher () {
        yield takeEvery(types.FETCH_SOURCES, fetchSourcesWorker);
    },
    * fetchNewsWatcher () {
        yield takeEvery(types.FETCH_NEWS, fetchNewsWorker);
    }
});
