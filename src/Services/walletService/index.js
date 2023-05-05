import { httpServiceWithRetry, } from '../common';
import { isEmptyOrNil } from '../../utilities';

const LOCAL_STORAGE_WALLET_KEY = 'walletInfo';

const removeCurrentWalletInfoFromLocal = () => localStorage.removeItem(LOCAL_STORAGE_WALLET_KEY);

const _saveInWalletService = async (data = {}) => {
    try {
        const { balance, name } = data;
        const queryOptions = {
            'method': 'POST',
            'url': `${process.env.REACT_APP_WALLET_BASE_URL_KEY}/setup`,
            'headers': {
                'Content-Type': 'application/json'
            },
            retries: 3,
            data: {
                balance,
                name,
            },
        };

        let response = await httpServiceWithRetry({
            queryOptions,
        });

        if  (response.data && response.data.status === 201) {
            return {success: true, error: null, data: response.data.data, message: response.data.message,};
        }

        throw new Error('Error in api end point');
    } catch(err) {
        console.log('err', err);
        return {success: false, error: err, data: {}};
    }
}

const saveWalletDetailsInLocalStorage = (data) => localStorage.setItem(
    LOCAL_STORAGE_WALLET_KEY, JSON.stringify(data),
);

const createWallet = async (data) => {
    try {
        const response = await _saveInWalletService(data);
        if (response.success === false) throw new Error('Something went wrong in wallet service api');
        if (isEmptyOrNil(response.data)) throw new Error('No response found for saving wallet details');

        // save in local storage
        saveWalletDetailsInLocalStorage(response.data);

        return response;
    } catch (err) {
        console.error(err.message);

        removeCurrentWalletInfoFromLocal();

        return {success: false, err: err, data: {}};
    }
};

const getWalletInfoFromLocal = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY));

const getWalletInfo = async (data) => {
    try {
        const { walletId, } = data;
        const queryOptions = {
            'method': 'GET',
            'url': `${process.env.REACT_APP_WALLET_BASE_URL_KEY}/wallet/${walletId}`,
            'headers': {
                'Content-Type': 'application/json'
            },
            retries: 3,
        };

        let response = await httpServiceWithRetry({
            queryOptions,
        });

        if  (response.data && response.data.status === 200) {
            return {success: true, error: null, data: response.data.data, message: response.data.message, };
        }

        return {success: false, message: 'Something went wrong', data: {}};
    } catch(err) {
        console.log('err', err);
        return {success: false, message: 'Something went wrong', data: {}};
    }
};

export {
    createWallet,
    getWalletInfoFromLocal,
    getWalletInfo,
    saveWalletDetailsInLocalStorage,
    removeCurrentWalletInfoFromLocal,
}
