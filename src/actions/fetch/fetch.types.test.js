//Core
import types from './types';

describe('fetch types: ', () => {
    test('types object should be frozen', () => {
        expect(Object.isFrozen(types)).toBe(true);
    });

    test('types object should not be mutated', () => {
        function mutate () {
            types.newProp = 'prop';
        }
        expect(mutate).toThrow();
    });
});
