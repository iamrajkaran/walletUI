import { httpServiceWithRetry, } from '../common';

const getUserTransactions = async (data) => {
    try {
        const { walletId, skip, limit } = data;
        const queryOptions = {
            'method': 'GET',
            'url': `${process.env.REACT_APP_WALLET_BASE_URL_KEY}/transactions`,
            'headers': {
                'Content-Type': 'application/json'
            },
            retries: 3,
            params: {
                walletId,
                skip,
                limit,
            },
        };

        let response = await httpServiceWithRetry({
            queryOptions,
        });

        if  (response.data && response.data.status === 200) {
            return {success: true, error: null, data: response.data.data, message: response.data.message,};
        }

        return {success: false, message: 'Something went wrong', data: {}};
    } catch(err) {
        console.log('err', err);
        return {success: false,  message: 'Something went wrong', error: err, data: {}};
    }
};

const performTransaction = async (data) => {
    try {
        const {
            type,
            amount,
            description,
            walletId,
        } = data;
        const queryOptions = {
            'method': 'POST',
            'url': `${process.env.REACT_APP_WALLET_BASE_URL_KEY}/transact/${walletId}`,
            'headers': {
                'Content-Type': 'application/json'
            },
            retries: 3,
            data: {
                type,
                amount,
                description,
            },
        };

        let response = await httpServiceWithRetry({
            queryOptions,
        });

        if  (response.data && response.data.status === 201) {
            return {success: true, error: null, data: response.data.data, message: response.data.message, };
        }
        if  (response.data && response.data.status === 200) {
            return {success: true, error: null, data: response.data.data, message: response.data.message, };
        }

        return {success: false, message: 'Something went wrong', data: {}};
    } catch(err) {
        console.log('err', err);
        return {success: false, error: err, data: {}, message: 'Something went wrong'};
    }
};

export {
    getUserTransactions,
    performTransaction,
}
