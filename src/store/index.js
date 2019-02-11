// Core
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// Instruments
import reducers from '../reducers';
import { saga } from '../sagas';

const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const middleware = [];

const composeEnhancers = devtools && dev ? devtools : compose;

const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005'
    }
});

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);


if (dev) {
    middleware.push(logger);
}

export default createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(saga);
