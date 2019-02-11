//Core
import { call, put, select } from 'redux-saga/effects';

//Instrument
import { apiArticles, apiKey, sourcesForView } from '../../../../instruments/api';
import fetchActions from '../../../../actions/fetch';
import viewActions from '../../../../actions/view';
import { checkResponseFromApi } from '../../../../helpers';
import nimg from '../../../../theme/assets/nimg.png';

export function* fetchNewsWorker () {
    try {
        yield put(fetchActions.startFetching());
        const news = yield select((state) => state.fetch.get('news').toJS());
        const isNewsUpdate = yield select((state) => state.view.get('isNewsUpdate'));
        const quantityNewNews = yield select((state) => state.view.get('quantityNewNews'));

        if (isNewsUpdate) {
            yield put(viewActions.clearNewsUpdate());
        }

        let allNewsResponse = [];

        for (let i = 0; i < sourcesForView.length; i++) {

            const responseNews = yield call(fetch, `${apiArticles}${sourcesForView[i]}${apiKey}`, {
                method: 'GET'
            });

            if (responseNews.status !== 200) {
                throw new Error(`News from '${sourcesForView[i]}' were not loaded.`);
            }

            const { articles, source } = yield call([responseNews, responseNews.json]);
            const newsSources = yield select((state) => state.fetch.get('newsSource').toJS());
            const [{
                category:    sourceCategory,
                description: sourceDescription,
                id:          sourceID,
                name:        sourceName
            }] = newsSources.filter((src) => src.id === source);
            const newsFromAPI = yield checkResponseFromApi(news, articles);

            yield newsFromAPI.shift();

            const articlesWithSource = newsFromAPI.map(({ author, description, publishedAt, title, url, urlToImage }) => ({
                author,
                description,
                publishedAt,
                title,
                url,
                urlToImage,
                sourceCategory,
                sourceDescription,
                sourceID,
                sourceName
            }));

            const filteredArticles = articlesWithSource.filter(({ publishedAt }) => publishedAt !== null);

            filteredArticles.forEach((el) => {
                el.author = el.author !== null && el.author !== '' ? el.author : el.sourceName;
                el.description = el.description !== null && el.description !== '' ? el.description : el.title;
                el.urlToImage = el.urlToImage !== null && el.urlToImage !== '' ? el.urlToImage : nimg;
            });

            allNewsResponse = [...filteredArticles, ...allNewsResponse];
        }
        if (news.length !== 0 && allNewsResponse.length !== 0) {
            yield put(viewActions.updateNews());
            yield put(viewActions.setQuantityNewNews(allNewsResponse.length));
        } else if (quantityNewNews !== 0 && allNewsResponse.length === 0) {
            yield put(viewActions.setQuantityNewNews(0));
        }

        yield put(fetchActions.fetchNewsSuccess(allNewsResponse));
    } catch ({ message }) {
        yield put(fetchActions.fetchNewsFail(message));
    } finally {
        yield put(fetchActions.stopFetching());
    }
}
