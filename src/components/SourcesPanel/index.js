// Core
import React, { Component } from 'react';
//Instruments
import Styles from './styles.module.scss';
import { array, bool, func, string } from 'prop-types';
import { getUniqueID } from '../../helpers/';

export default class SourcesPanel extends Component {

    static propTypes = {
        defaultNewsSource:    array.isRequired,
        filterPanelIsVisible: bool.isRequired,
        getSelectedCategory:  func.isRequired,
        getSelectedSources:   func.isRequired,
        isFilterPanelUsed:    bool.isRequired,
        newsSource:           array.isRequired,
        selectedCategory:     string.isRequired,
        selectedSources:      array.isRequired
    };

    constructor () {
        super();
        this.clickHandleBySourceNews = this._clickHandleBySourceNews.bind(this);
        this.sendSources = this._sendSources.bind(this);
        this.clearSources = this._clearSources.bind(this);
        this.sendCategory = this._sendCategory.bind(this);
    }

    state = {
        currentSourcesID:   [],
        currentSourcesName: []
    };

    _sendCategory (ev) {
        const categoryName = ev.target.textContent.charAt(0).toLowerCase() + ev.target.textContent.slice(1);

        this.props.getSelectedCategory(categoryName);
    }

    _clickHandleBySourceNews (ev) {

        const { currentSourcesID, currentSourcesName } = this.state;
        const srcID = ev.target.id;
        const srcName = ev.target.textContent;

        if (currentSourcesName.filter((el) => el === srcName).length === 0) {
            this.setState(() => ({
                currentSourcesID:   [srcID, ...currentSourcesID],
                currentSourcesName: [srcName, ...currentSourcesName]
            }));
        }
    }

    _sendSources () {
        this.props.getSelectedSources(this.state.currentSourcesID);
        this.clearSources();
    }

    _clearSources () {
        this.setState(() => ({
            currentSourcesID:   [],
            currentSourcesName: []
        }));
    }

    render () {

        const { currentSourcesName } = this.state;
        const { defaultNewsSource, filterPanelIsVisible, isFilterPanelUsed, selectedCategory, selectedSources } = this.props;

        const sourcesList = defaultNewsSource.map(({ description, id, name }) =>

            (<li
                className = { selectedSources.filter((el) => el === id).length === 0 ? null : Styles.activeSource }
                id = { id }
                key = { getUniqueID(10) }
                title = { description }
                onClick = { this.clickHandleBySourceNews }>
                { name }
            </li>)
        );

        const currentSourcesView = currentSourcesName.map((el) => <span key = { getUniqueID(7) }>{ el }</span>);

        const selectedSource = currentSourcesName.length !== 0 ?
            currentSourcesView : <span className = { Styles.defaultSpan }>Select news sources...</span>;

        const category = [...new Set(defaultNewsSource.map((el) => el.category))];

        const upperCategory = category.map((el) => el.charAt(0).toUpperCase() + el.slice(1));

        const selectedCategoryToUpperCase = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

        const categoryGeneral = upperCategory.map((el) =>
            (<li
                className = { selectedCategoryToUpperCase === el ? Styles.activeSource : null }
                key = { getUniqueID(11) }
                onClick = { this.sendCategory }>
                { el }
            </li>)
        );

        const filterPanelClass = filterPanelIsVisible ?
            Styles.animationOpen : isFilterPanelUsed ?
                Styles.animationClose : Styles.unUsed;

        const buttonActiveClass = currentSourcesName.length !== 0 ? Styles.activeButton : null;

        return (
            <section className = { Styles.sourcePanel }>
                <div
                    className = { filterPanelClass }>
                    <div className = { Styles.category }>
                        <ul>
                            {categoryGeneral}
                        </ul>
                    </div>
                    <div className = { Styles.sources }>
                        <ul>
                            { sourcesList }
                        </ul>
                        <p>
                            { selectedSource }
                            <button
                                className = { buttonActiveClass }
                                onClick = { this.clearSources }>
                                Clear
                            </button>
                            <button
                                className = { buttonActiveClass }
                                onClick = { this.sendSources }>
                                Apply
                            </button>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}
