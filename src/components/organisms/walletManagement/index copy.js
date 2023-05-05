import './index.css';
import { useState, useEffect } from 'react';
import { isEmptyOrNil } from '../../../utilities';

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

    const [walletInfo, setWalletInfo] = useState({});

    // Get/Set States
    const [name, setName] = useState('');
    const [balance, setBalance] = useState();
    const [walletId, setWalletId] = useState('');
    const [txnType, setTxnType] = useState('Debit');
    const [txnAmount, setTxnAmount] = useState('');
    const [txnDescription, setTxnDescription] = useState('');

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

    const handleResetForWalletRegd = (event) => {
      if (!isEmptyOrNil(event)) event.preventDefault();
      setName('');
      setBalance('');
    };
    const handleResetForLoginWithOtherUser = (event) => {
      if (!isEmptyOrNil(event)) event.preventDefault();
      setWalletId('');
    };
    const handleResetForTxn = (event) => {
      if (!isEmptyOrNil(event)) event.preventDefault();
      setTxnAmount('');
      setTxnDescription('');
      setTxnType('Debit');
    };
    const resetAll = () => {
      handleResetForWalletRegd();
      handleResetForLoginWithOtherUser();
      handleResetForTxn();
    }

    // Handle Onchange data
    const handleNameChange = (event) => {
      event.preventDefault();
      setName(event.target.value);
    };
    const handleBalanceChange = (event) => {
      event.preventDefault();
      setBalance(event.target.value);
    };
    const handleWalletIdChange = (event) => {
      event.preventDefault();
      setWalletId(event.target.value);
    };
    const handleTxnAmountChange = (event) => {
      event.preventDefault();
      setTxnAmount(event.target.value);
    };
    const handleTxnDescriptionChange = (event) => {
      event.preventDefault();
      setTxnDescription(event.target.value);
    };
    const handleTxnType = (event) => {
      event.preventDefault();
      setTxnType(event.target.value);
    };

    // Handlers for Submit
    const handleSubmitForWalletRegd = async (event) => {
        event.preventDefault(); // avoid reload
        // Save wallet details
        const response = await createWallet({
          name,
          balance,
        });

        if (response.success === false) { alert('Error occured, Please try again'); return; }

        alert('success');

        handleResetForWalletRegd();

        // On success fill wallet info
        getWalletDetailsFromLocalIfExist();
    };
    const handleSubmitForUserChange = async (event) => {
        try {
            event.preventDefault(); // avoid reload
            // Get wallet details

            if (isEmptyOrNil(walletId)) { alert('Please enter walletId'); return; }
            const response = await getWalletInfo({
              walletId,
            });
            if (response.success === false) {
              alert('Error occurred, Please try again');
              return;
            }

            if (isEmptyOrNil(response.data)) {
              alert(response.message);
              return;
            }

            // On success fill wallet info in local
            saveWalletDetailsInLocalStorage(response.data);
            getWalletDetailsFromLocalIfExist();
            handleResetForLoginWithOtherUser();
            alert('success');
        } catch(err) {
            console.error(err);
            alert('Error occured, Please try again');
        }
    };
    const handleSubmitForTransaction = async (event) => {
      try {
          event.preventDefault(); // avoid reload

          getWalletDetailsFromLocalIfExist(); // Fill WalletId

          if (isEmptyOrNil(txnType)) { alert('Transaction should be Debit/Credit'); return; }
          if (isEmptyOrNil(txnAmount) || txnAmount < 0) { alert('Transaction amount should be positive and required'); return; }
          if (isEmptyOrNil(walletInfo.id)) { alert('Wallet id is not present'); return; }

          const responseOfTxn = await performTransaction({
            walletId: walletInfo.id,
            type: txnType,
            amount: txnAmount,
            description: txnDescription,
          });
          if (responseOfTxn.success === false) {
            console.log('eeee', responseOfTxn);
            alert(responseOfTxn.message);
            return;
          }
          if (isEmptyOrNil(responseOfTxn.data)) {
            alert(responseOfTxn.message);
            return;
          }

          // Post Transaction
          if (!isEmptyOrNil(responseOfTxn.data.balance) ) {
            const data = walletInfo;
            const updateData = {
              ...data,
              balance: responseOfTxn.data.balance,
            };

            setWalletInfo(updateData);

            saveWalletDetailsInLocalStorage(updateData);
          }

          handleResetForTxn();

          alert('success');
      } catch(err) {
          console.error(err);
          alert('Error occured, Please try again');
      }
    };
    const handleSubmitForUserLogout = () => {
      try {
        removeCurrentWalletInfoFromLocal();
        setWalletInfo({});
        alert('User removed');
        resetAll();
      } catch (err) {
        alert('Something went wrong');
      }
    }

    return (
      <div className="main">
            {
              !isWalletInfoVisible() &&
              <div className="module">
                <label className="label-title" >Enter new Wallet:</label>
                <div className="row">
                  <input type="text" placeholder="Name" className="input-field" value={name} onChange={handleNameChange} />
                </div>
                <div className="row">
                  <input type="text" placeholder="Balance" className="input-field" value={balance} onChange={handleBalanceChange} />
                </div>
                <div className="row">
                  <button className="submit-btn" onClick={handleSubmitForWalletRegd}>Submit</button>
                  <button className="reset-btn" onClick={handleResetForWalletRegd} >Reset</button>
                </div>
              </div>
            }

            {
              isWalletInfoVisible() &&
              <div className="module">
                <label className="label-title" >Login details: </label>

              {Object.entries(walletInfo).map(([key, value]) => (
                <label className="label-container" key={key}>{key}: {value}</label>
              ))}
              <div className="row">
                  <button className="logout-btn" onClick={handleSubmitForUserLogout}>Logout</button>
              </div>
              </div>
            }

            {
              isWalletInfoVisible() &&
              <div className="module">
                <label className="label-title" >Login with other user:</label>
                <div className="row">
                  <input type="text" className="input-field" placeholder="WalletId" value={walletId} onChange={handleWalletIdChange} />
                </div>
                <div className="row">
                  <button className="submit-btn" onClick={handleSubmitForUserChange}>Submit</button>
                  <button className="reset-btn" onClick={handleResetForLoginWithOtherUser} >Reset</button>
                </div>
              </div>
            }

            {
              isWalletInfoVisible() &&
              <div className="module">
                  <label className="label-title" >Perform transaction:</label>
                <div className="row">
                  <input type="text" placeholder="Amount"  htmlFor="txn" value={txnAmount} className="input-field" onChange={handleTxnAmountChange} />
                </div>

                <div className="row">
                  <input type="text" placeholder="Description"  htmlFor="txn" value={txnDescription} className="input-field" onChange={handleTxnDescriptionChange} />
                </div>

                <div className="row">
                  <label >Choose type:</label>
                  <select className= "select-option" id="txn" name="txn" onChange={handleTxnType} value={txnType}>
                      <option value="Debit">Debit</option>
                      <option value="Credit">Credit</option>
                    </select>
                </div>

                <div className="row">
                  <button className="submit-btn" onClick={handleSubmitForTransaction}>Submit</button>
                  <button className="reset-btn" onClick={handleResetForTxn}>Reset</button>
                </div>

              </div>
            }
      </div>
    );
}

export default WalletManagement;
