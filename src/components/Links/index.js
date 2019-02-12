import React from 'react';

import Styles from './styles.module.scss';
import git from '../../theme/assets/git.jpg';
import logo from '../../theme/assets/logo.png';

const Links = () => (
    <section className = { Styles.footer }>
        <a href = 'https://newsapi.org/docs/v1' target = '_blank'  rel="noopener noreferrer" >
            <img src = { logo } alt = 'Logo News API' title = 'News Api' />
        </a>
        <a href = 'https://github.com/smovzhsergey/APINews' target = '_blank'  rel="noopener noreferrer" >
            <img src = { git } alt = 'Logo GitHub' title = 'Git Hub' />
        </a>
    </section>
);

export  default Links;