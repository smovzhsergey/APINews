//core
import React, { Component } from 'react';
//instruments
import { func, number, string } from 'prop-types';
import Styles from './styles.module.scss';

export default class Search extends Component {

    static propTypes = {
        changeSearchValue: func.isRequired,
        clearSearchValue:  func.isRequired,
        matchesFound:      number.isRequired,
        resetNewsInView:   func.isRequired,
        searchValue:       string.isRequired
    };


    constructor () {
        super();
        this.searchByInputChange = this._searchByInputChange.bind(this);
        this.clearInputValue = this._clearInputValue.bind(this);
    }

    _searchByInputChange (event) {
        this.props.changeSearchValue(event.target.value);
    }

    _clearInputValue () {
        this.props.clearSearchValue();
        this.props.resetNewsInView();
    }

    render () {
        const { matchesFound, searchValue } = this.props;
        const isSearchValueEmpty = searchValue === '' ?
            null : <span className = { Styles.clearInput } onClick = { this.clearInputValue } />;

        const matchesNumber = searchValue === '' ? null : <span>News found: { matchesFound }</span>;

        return (
            <section className = { Styles.search }>
                <input
                    id = 'search'
                    placeholder = 'What are you looking for...'
                    type = 'text'
                    value = { searchValue }
                    onChange = { this.searchByInputChange }
                />
                { isSearchValueEmpty }
                { matchesNumber }
            </section>
        );
    }
}
