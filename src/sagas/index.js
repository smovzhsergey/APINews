//Core
import { all } from 'redux-saga/effects';

//Instruments
import news from './news';

export function* saga () {
    yield all([
        news.fetchSourcesWatcher(),
        news.fetchNewsWatcher()
    ]);
}
