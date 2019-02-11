export const getUniqueID = (length) => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const checkResponseFromApi = (state, response) => {

    if (typeof state !== 'object' || typeof response !== 'object') {
        throw new Error('State and response should be a objects');
    }

    let k = 0;
    const result = [];

    for (let i = 0; i < response.length; i++) {
        let check = 1;

        for (let j = 0; j < state.length; j++) {
            if (response[i].title === state[j].title) {
                check = 0;
                break;
            }
        }
        if (check === 1) {
            result[k+=1] = response[i];
        }
    }

    return result;
};
