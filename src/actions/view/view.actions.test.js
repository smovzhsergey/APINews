//Core
import actions from './';

const quantity = 5;

describe('view actions: ', () => {
    test('"openFilterPanel" actions creator should produce a corresponding action', () => {
        expect(actions.openFilterPanel()).toMatchSnapshot();
    });
    test('"closeFilterPanel" actions creator should produce a corresponding action', () => {
        expect(actions.closeFilterPanel()).toMatchSnapshot();
    });
    test('"showButtonUp" actions creator should produce a corresponding action', () => {
        expect(actions.showButtonUp()).toMatchSnapshot();
    });
    test('"hideButtonUp" actions creator should produce a corresponding action', () => {
        expect(actions.hideButtonUp()).toMatchSnapshot();
    });
    test('"addNewsInView" actions creator should produce a corresponding action', () => {
        expect(actions.addNewsInView()).toMatchSnapshot();
    });
    test('"resetNewsInView" actions creator should produce a corresponding action', () => {
        expect(actions.resetNewsInView()).toMatchSnapshot();
    });
    test('"updateNews" actions creator should produce a corresponding action', () => {
        expect(actions.updateNews()).toMatchSnapshot();
    });
    test('"clearNewsUpdate" actions creator should produce a corresponding action', () => {
        expect(actions.clearNewsUpdate()).toMatchSnapshot();
    });
    test('"setQuantityNewNews" actions creator should produce a corresponding action', () => {
        expect(actions.setQuantityNewNews(quantity)).toMatchSnapshot();
    });
});
