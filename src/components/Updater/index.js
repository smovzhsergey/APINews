// Core
import React from 'react';

// Instruments
import Styles from './styles.module.scss';
import { number } from 'prop-types';

const Updater = ({ quantityNewNews }) => (
    <section className = { Styles.updater }>
        <p>{ quantityNewNews } new articles</p>
    </section>
);

Updater.propTypes = {
    quantityNewNews: number.isRequired
};

export default Updater;
