import axios from 'axios';
import axiosRetry from 'axios-retry';

/**
 * Function to invoke url with retry mechanism
 * @param {Object} httpOptions http options
 * @param {String} data.method - required
 * @param {String} data.url - required
 * @param {String} data.headers - required
 * @param {String} data.retries - required
 * @param {String} data.params - required
 * @returns {Promise} result
 */
const httpServiceWithRetry = async (httpOptions) => {
    const { queryOptions, } = httpOptions;
    const shouldRetry = (error) => {
        console.error('Error Status code ', error);

        return axiosRetry.isNetworkError(error)
            || axiosRetry.isRetryableError(error)
            || error.code === 'ECONNABORTED'
            || error.code === 'ECONNRESET'
            || (error.response && error.response.status >= 500)
            || (error.response && error.response.status === 429);
    };
    const retryConfig = {
        retries: queryOptions.retries || 0,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: shouldRetry,
        shouldResetTimeout: true,
    };

    try {
        console.log(`httpServiceWithRetry: REQUEST: queryOptions ${JSON.stringify(queryOptions)}`);

        await axiosRetry(axios, retryConfig);

        return axios(queryOptions);
    } catch (error) {
        console.error(`httpServiceWithRetry: url: ${queryOptions.url} | method: ${queryOptions.method} | query: ${JSON.stringify(queryOptions.query)} | headers: ${JSON.stringify(queryOptions.headers)} | error: ${JSON.stringify(error)}`);
        throw error;
    }
};

export {
    httpServiceWithRetry,
};
