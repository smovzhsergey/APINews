import { getUniqueID, checkResponseFromApi } from "./index";

const idLength = 10;
const state = {};
const response = {};
const error = 'State and response should be a objects';

describe('helpers', () => {

    //getUniqueID
    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID should return string', () => {
        expect(typeof getUniqueID(idLength)).toBe('string');
    });

    test('getUniqueID should return result length = idLength', () => {
        expect(getUniqueID(idLength).length).toBe(idLength);
    });

    // checkResponseFromApi
    test('checkResponseFromApi should be a function', () => {
        expect(typeof checkResponseFromApi).toBe('function');
    });

    test('checkResponseFromApi should return object', () => {
        expect(typeof checkResponseFromApi(state, response)).toBe('object');
    });

    test('typeof state should be object', () => {
        expect(typeof state).toBe('object');
    });

    test('typeof response should be object', () => {
        expect(typeof response).toBe('object');
    });

    test('checkResponseFromApi should throw an error if wrong type arguments were passed', () => {
        function checkResponseFromApiWithError () {
            checkResponseFromApi('1',1);
        }

        expect(checkResponseFromApiWithError).toThrowError(error);
    });
});