import './index.css';
import { useState, useEffect } from 'react';
import { isEmptyOrNil } from '../../../utilities';
import CreateWallet from './createWallet';
import WalletDetails from './walletDetails';
import LoginOtherUser from './loginOtherUser';
import DoTransaction from './doTransaction';

const WalletManagement = (props) => {
    const { walletService, userTransactionService, } = props.data;

    const { performTransaction, } = userTransactionService;
    const {
      getWalletInfoFromLocal,
      getWalletInfo,
      createWallet,
      saveWalletDetailsInLocalStorage,
      removeCurrentWalletInfoFromLocal,
    } = walletService;

    // Get/Set States
    const [walletInfo, setWalletInfo] = useState({});

    const getWalletDetailsFromLocalIfExist = () => {
      const userInfo = getWalletInfoFromLocal();

      if (!isEmptyOrNil(userInfo)) setWalletInfo(userInfo);
    };

    useEffect(() => {
      // on load component
      getWalletDetailsFromLocalIfExist();
    }, [])

    // View Render conditional statements
    const isWalletInfoVisible = () => !isEmptyOrNil(walletInfo);

    return (
      <div className="main">
            {
              !isWalletInfoVisible() &&
                <CreateWallet
                    createWallet={createWallet}
                    getWalletDetailsFromLocalIfExist={getWalletDetailsFromLocalIfExist}
                    isWalletInfoVisible={isWalletInfoVisible}
                />
            }

            {
              isWalletInfoVisible() &&
                <WalletDetails
                    walletInfo={walletInfo}
                    removeCurrentWalletInfoFromLocal={removeCurrentWalletInfoFromLocal}
                    setWalletInfo={setWalletInfo}
                    isWalletInfoVisible={isWalletInfoVisible}
                />
            }

            {
              isWalletInfoVisible() &&
                <LoginOtherUser
                    getWalletInfo={getWalletInfo}
                    saveWalletDetailsInLocalStorage={saveWalletDetailsInLocalStorage}
                    getWalletDetailsFromLocalIfExist={getWalletDetailsFromLocalIfExist}
                    isWalletInfoVisible={isWalletInfoVisible}
                />
            }

            {
              isWalletInfoVisible() &&
              <DoTransaction
                walletInfo={walletInfo}
                performTransaction= {performTransaction}
                getWalletDetailsFromLocalIfExist={getWalletDetailsFromLocalIfExist}
                setWalletInfo={setWalletInfo}
                saveWalletDetailsInLocalStorage={saveWalletDetailsInLocalStorage}
                isWalletInfoVisible={isWalletInfoVisible}
              />
            }
      </div>
    );
}

export default WalletManagement;
