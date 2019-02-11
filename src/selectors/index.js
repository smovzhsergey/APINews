import { createSelector } from 'reselect';

export const getDefaultSources = createSelector(
    (state) => state,
    (fetch) => fetch.get('defaultNewsSource').toJS()
);

export const getNews = createSelector(
    (state) => state,
    (fetch) => fetch.get('news').toJS()
);

export const getNewsSources = createSelector(
    (state) => state,
    (fetch) => fetch.get('newsSource').toJS()
);

export const getSelectedSources = createSelector(
    (state) => state,
    (filter) => filter.get('selectedSources').toJS()
);

export const getSelectedCategory = createSelector(
    (state) => state,
    (filter) => filter.get('selectedCategory')
);

export const getSearchValue = createSelector(
    (state) => state,
    (search) => search.get('searchValue')
);
