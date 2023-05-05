import {
    createWallet,
    getWalletInfoFromLocal,
    getWalletInfo,
    saveWalletDetailsInLocalStorage,
    removeCurrentWalletInfoFromLocal,
} from './walletService/index.js';
import {
    getUserTransactions,
    performTransaction,
} from './userTransactionService/index.js';

const walletService = {
    createWallet,
    getWalletInfoFromLocal,
    getWalletInfo,
    saveWalletDetailsInLocalStorage,
    removeCurrentWalletInfoFromLocal,
};
const userTransactionService = {
    getUserTransactions,
    performTransaction,
};
export {
    walletService,
    userTransactionService,
};

