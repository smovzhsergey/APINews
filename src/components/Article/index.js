// Core
import React, { Component } from 'react';
//Instruments
import { string } from 'prop-types';
import Styles from './styles.module.scss';
import Transition from 'react-transition-group/Transition';
import { TweenLite } from 'gsap';

export default class Article extends Component {

    static propTypes = {
        author:            string.isRequired,
        description:       string.isRequired,
        publishedAt:       string.isRequired,
        sourceCategory:    string.isRequired,
        sourceDescription: string.isRequired,
        sourceName:        string.isRequired,
        title:             string.isRequired,
        url:               string.isRequired,
        urlToImage:        string.isRequired
    };

    constructor () {
        super();
        this.handlePublishedAppear = this._handlePublishedAppear.bind(this);
        this.handleCategoryAppear = this._handleCategoryAppear.bind(this);
        this.handleDescriptionAppear = this._handleDescriptionAppear.bind(this);
        this.correctionDate = this._correctionDate.bind(this);
    }

    _handlePublishedAppear (el) {
        TweenLite.fromTo(el, 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 });
    }

    _handleCategoryAppear (el) {
        TweenLite.fromTo(el, 1, { x: 700, opacity: 0 }, { x: 0, opacity: 1 });
    }

    _handleDescriptionAppear (el) {
        TweenLite.fromTo(el, 1, { opacity: 0 }, { opacity: 1 });
    }

    _correctionDate () {
        const { publishedAt } = this.props;
        const at = ' at ';

        return publishedAt.substr(0, 10) + at + publishedAt.substr(11, 8);
    }

    render () {

        const {
            author,
            description,
            sourceCategory,
            sourceDescription,
            sourceName,
            title,
            url,
            urlToImage
        } = this.props;

        return (
            <section className = { Styles.article }>
                <h3> <a href = { url } target = '_blank' rel="noopener noreferrer" title = { sourceName } >{ title }</a> </h3>
                <div>
                    <figure>
                        <span className = { Styles.source } title = { sourceDescription }>{ sourceName }</span>
                        <img alt = { `Illustration to the article "${title}"` } src = { urlToImage } />
                        <figcaption>author:{ author }</figcaption>
                    </figure>

                    <article>
                        <Transition
                            appear
                            in
                            timeout = { 800 }
                            onEnter = { this.handlePublishedAppear }>
                            <span className = { Styles.published }> published: { this.correctionDate() }</span>
                        </Transition>
                        <Transition
                            appear
                            in
                            timeout = { 800 }
                            onEnter = { this.handleCategoryAppear }>
                            <span className = { Styles.category } >{ sourceCategory }</span>
                        </Transition>
                        <Transition
                            appear
                            in
                            timeout = { 800 }
                            onEnter = { this.handleDescriptionAppear }>
                            <p>{ description }</p>
                        </Transition>
                    </article>
                </div>
            </section>
        );
    }
}
