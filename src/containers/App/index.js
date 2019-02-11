// Core
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Instruments
import { array, bool, number, object, string } from 'prop-types';
import searchActions from '../../actions/search';
import viewActions from '../../actions/view';
import filterActions from '../../actions/filter';
import fetchActions from '../../actions/fetch';
import {
    getDefaultSources,
    getNews,
    getNewsSources,
    getSearchValue,
    getSelectedCategory,
    getSelectedSources
} from '../../selectors';

// Components
import ArticleList from '../../components/ArticleList';


class App extends Component {

    static propTypes = {
        actions:              object.isRequired,
        buttonUpVisible:      bool.isRequired,
        defaultNewsSource:    array.isRequired,
        filterPanelIsVisible: bool.isRequired,
        isFetching:           bool.isRequired,
        isFilterPanelUsed:    bool.isRequired,
        isNewsUpdate:         bool.isRequired,
        news:                 array.isRequired,
        newsInView:           number.isRequired,
        newsSource:           array.isRequired,
        quantityNewNews:      number.isRequired,
        searchValue:          string.isRequired,
        selectedCategory:     string.isRequired,
        selectedSources:      array.isRequired,
        step:                 number.isRequired
    };

    render () {
        return <ArticleList { ...this.props } />;
    }
}

const mapStateToProps = ({ search, view, filter, fetch }) => ({
    searchValue:          getSearchValue(search),
    filterPanelIsVisible: view.get('filterPanelIsVisible'),
    buttonUpVisible:      view.get('buttonUpVisible'),
    isFilterPanelUsed:    view.get('isFilterPanelUsed'),
    isNewsUpdate:         view.get('isNewsUpdate'),
    step:                 view.get('step'),
    newsInView:           view.get('newsInView'),
    quantityNewNews:      view.get('quantityNewNews'),
    news:                 getNews(fetch),
    newsSource:           getNewsSources(fetch),
    defaultNewsSource:    getDefaultSources(fetch),
    isFetching:           fetch.get('isFetching'),
    selectedCategory:     getSelectedCategory(filter),
    selectedSources:      getSelectedSources(filter)
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...searchActions, ...viewActions, ...filterActions, ...fetchActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
