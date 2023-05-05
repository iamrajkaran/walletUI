import dotenv from 'dotenv';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home/index.js';
import NotFound from './pages/NotFound/index.js';
import { walletService, userTransactionService } from './Services';
import transactionsComponent from './components/organisms/transactions';
import userManagementComponent from './components/organisms/walletManagement';

dotenv.config();

const links = [{
    text: 'Wallet Info',
    url: '/wallet_info',
},
{
    text: 'Wallet Transactions',
    url: '/transactions',
}];

const getRelevantLinks = () => {
    const currentUrl = window.location.pathname;

    if (currentUrl === '/') {
        return links.filter((item) => item.url !== '/wallet_info');
    }

    return links.filter((item) => item.url !== currentUrl);
};

const headerProps = {
    links: getRelevantLinks(),
};

const bodyPropsForWallet = {
    walletService,
    userTransactionService: {
        performTransaction: userTransactionService.performTransaction
    },
};
const bodyPropsForTransactions = {
    userTransactionService: {
        getUserTransactions: userTransactionService.getUserTransactions
    },
    walletService: {
        getWalletInfoFromLocal: walletService.getWalletInfoFromLocal,
    },
};

const App = () => (
    <Router>
        <Routes>
            <Route
                exact path="/"
                element={<Home
                    headerProps={headerProps}
                    bodyProps={bodyPropsForWallet}
                    childComponent={userManagementComponent}
                />}
            />
            <Route
                exact path="/wallet_info"
                element={<Home
                    headerProps={headerProps}
                    bodyProps={bodyPropsForWallet}
                    childComponent={userManagementComponent}
                />}
            />
            <Route
                path="/transactions"
                element={<Home
                    headerProps={headerProps}
                    bodyProps={bodyPropsForTransactions}
                    childComponent={transactionsComponent}
                />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
);

export default App;