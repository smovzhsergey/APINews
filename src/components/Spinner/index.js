// Core
import React from 'react';
import { bool } from 'prop-types';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.module.scss';

const portal = document.getElementById('spinner');

const Spinner = ({ isFetching }) =>
    isFetching ?
        createPortal(
            <section className = { Styles.spinner }>
                <span className = { Styles.loader1 } />
                <span className = { Styles.loader2 } />
                <span className = { Styles.loader3 } />
            </section>,
            portal)
        :
        null;

Spinner.propTypes = {
    isFetching: bool.isRequired
};

export default Spinner;
