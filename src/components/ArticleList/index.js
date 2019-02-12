// Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.module.scss';
import { array, bool, number, object, string } from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { TweenLite } from 'gsap';

// Components
import Article from '../Article';
import Links from '../Links';
import Search from '../Search';
import SourcesPanel from '../SourcesPanel';
import Spinner from '../Spinner';
import Updater from '../Updater';

export default class ArticleList extends Component {

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

    constructor () {
        super();
        this.root = document.getElementById('root');
        this.comparePublishedAt = this._comparePublishedAt.bind(this);
        this.clearFilter = this._clearFilter.bind(this);
        this.openCloseCategoryPanel = this._openCloseCategoryPanel.bind(this);
        this.handleSearchAppear = this._handleSearchAppear.bind(this);
        this.handleUpdaterAppear = this._handleUpdaterAppear.bind(this);
        this.handleUpdaterDisappear = this._handleUpdaterDisappear.bind(this);
        this.addNewArticlesInView = this._addNewArticlesInView.bind(this);
        this.scrollOnTop = this._scrollOnTop.bind(this);
        this.checkFilterCategoryOrSource = this._checkFilterCategoryOrSource.bind(this);
        this.showUpdater = this._showUpdater.bind(this);
    }

    componentDidMount () {
        this.props.actions.fetchSources();
        this.refetchNews = setInterval(
            () => this.props.actions.fetchNews(), 900000
        );
        document.addEventListener('scroll', this.addNewArticlesInView);
    }

    componentWillUnmount () {
        clearInterval(this.refetchNews);
    }

    _clearFilter () {
        const { actions: { resetFilter, resetNewsInView }} = this.props;

        resetFilter();
        resetNewsInView();
    }

    _openCloseCategoryPanel () {

        const {
            actions: {
                closeFilterPanel,
                openFilterPanel
            },
            filterPanelIsVisible
        } = this.props;

        if (filterPanelIsVisible) {
            closeFilterPanel();
        } else {
            openFilterPanel();
        }
    }

    _comparePublishedAt (newsA, newsB) {
        return Date.parse(newsB.publishedAt) - Date.parse(newsA.publishedAt);
    }

    _addNewArticlesInView () {
        const {
            actions: {
                showButtonUp,
                hideButtonUp,
                addNewsInView
            },
            buttonUpVisible,
            news,
            newsInView
        } = this.props;
        const height = this.root.clientHeight;
        const scroll = window.pageYOffset;
        const browserHeight = window.innerHeight * 2;
        const difference = height - browserHeight;


        if (scroll > browserHeight && !buttonUpVisible) {
            showButtonUp();
        } else if (scroll < browserHeight && buttonUpVisible) {
            hideButtonUp();
        }

        if (scroll > difference && newsInView < news.length) {
            addNewsInView();
        }
    }

    _scrollOnTop () {
        window.scrollTo(0, 0);
    }

    _checkFilterCategoryOrSource () {
        const { news, selectedCategory, selectedSources } = this.props;

        let resultNews = [];

        if (selectedCategory.length === 0 && selectedSources.length === 0) {
            resultNews = news;
        } else if (selectedCategory.length !== 0) {
            resultNews = news.filter(({ sourceCategory }) => sourceCategory === selectedCategory);
        } else {
            selectedSources.forEach((_sourceID) => {
                resultNews = [...news.filter((el) => el.sourceID === _sourceID), ...resultNews];
            });
        }

        return resultNews;
    }

    _handleUpdaterAppear (updater) {
        TweenLite.fromTo(updater, 2, { x: 0, y: -200, opacity: 0.5 }, { x: 0, y: 100, opacity: 1 });
    }

    _handleUpdaterDisappear (updater) {
        TweenLite.fromTo(updater, 2, { x: 0, opacity: 1 }, { x: 400, opacity: 0.5 });
    }

    _handleSearchAppear (search) {
        TweenLite.fromTo(search, 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 });
    }

    _showUpdater () {
        const { isNewsUpdate, quantityNewNews } = this.props;

        return (
            isNewsUpdate ?
                <Transition
                    appear
                    in
                    timeout = { 3000 }
                    onEnter = { this.handleUpdaterAppear }
                    onEntered = { this.handleUpdaterDisappear }>
                    <Updater quantityNewNews = { quantityNewNews } />
                </Transition>
                :
                null
        );
    }

    render () {

        const {
            actions: {
                changeSearchValue,
                clearSearchValue,
                resetNewsInView,
                getSelectedCategory,
                getSelectedSources
            },
            buttonUpVisible,
            defaultNewsSource,
            filterPanelIsVisible,
            isFetching,
            isFilterPanelUsed,
            newsSource,
            searchValue,
            selectedCategory,
            selectedSources
        } = this.props;

        const newsFilter = this.checkFilterCategoryOrSource().filter(({ description, title }) =>
            description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
            ||
            title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        );
        const matchesFound = newsFilter.length;
        const newsToView = newsFilter.sort(this.comparePublishedAt).slice(0, this.props.newsInView);
        const articleList = newsToView.map((
            {
                author,
                description,
                publishedAt,
                sourceCategory,
                sourceDescription,
                sourceName,
                title,
                url,
                urlToImage
            },
            index) =>
            (<Article
                author = { author }
                description = { description }
                key = { index }
                publishedAt = { publishedAt }
                searchValue = { searchValue }
                sourceCategory = { sourceCategory }
                sourceDescription = { sourceDescription }
                sourceName = { sourceName }
                title = { title }
                url = { url }
                urlToImage = { urlToImage }
            />)
        );

        const isResetFilterActive =
            selectedCategory.length === 0 && selectedSources.length === 0
                ? null
                : <button onClick = { this.clearFilter }>Reset Filter</button>;

        const buttonFilterPanelClass = filterPanelIsVisible ? Styles.activeFilter : null;
        const buttonClass = buttonUpVisible ? Styles.visibleUp : Styles.hideUp;
        const filterPanelValue = filterPanelIsVisible ? 'Close filter panel' :'Open filter panel';


        return (
            <section className = { Styles.feed } onScroll = { this.scrolling }>
                <Spinner isFetching = { isFetching } />
                <div className = { Styles.header }>
                    <Transition
                        appear
                        in
                        timeout = { 800 }
                        onEnter = { this.handleSearchAppear }>
                        <Search
                            changeSearchValue = { changeSearchValue }
                            clearSearchValue = { clearSearchValue }
                            matchesFound = { matchesFound }
                            resetNewsInView = { resetNewsInView }
                            searchValue = { searchValue }
                        />
                    </Transition>
                    <div>
                        { isResetFilterActive }
                        <button
                            className = { buttonFilterPanelClass }
                            onClick = { this.openCloseCategoryPanel }>
                            { filterPanelValue }
                        </button>
                    </div>
                </div>
                <SourcesPanel
                    defaultNewsSource = { defaultNewsSource }
                    filterPanelIsVisible = { filterPanelIsVisible }
                    getCategoryFromSourcesPanel = { this.getCategoryFromSourcesPanel }
                    getSelectedCategory = { getSelectedCategory }
                    getSelectedSources = { getSelectedSources }
                    getSourcesFromSourcesPanel = { this.getSourcesFromSourcesPanel }
                    isFilterPanelUsed = { isFilterPanelUsed }
                    newsSource = { newsSource }
                    selectedCategory = { selectedCategory }
                    selectedSources = { selectedSources }
                />
                { articleList }
                { this.showUpdater() }
                <span className = { buttonClass } id = 'upButton' onClick = { this.scrollOnTop }>Up</span>
                <Links />
            </section>
        );
    }
}
