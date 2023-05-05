import InputDetail from '../../molecules/inputDetail';
import './index.css';
import { useState, useEffect, } from 'react';
import { isEmptyOrNil } from '../../../utilities';

const DoTransaction = (props) => {
    const {
        walletInfo,
        getWalletDetailsFromLocalIfExist,
        setWalletInfo,
        performTransaction,
        saveWalletDetailsInLocalStorage,
        isWalletInfoVisible,
    } = props;

    const [txnType, setTxnType] = useState('Debit');
    const [txnAmount, setTxnAmount] = useState('');
    const [txnDescription, setTxnDescription] = useState('');

    const handleResetForTxn = (event) => {
        if (!isEmptyOrNil(event)) event.preventDefault();
        setTxnAmount('');
        setTxnDescription('');
        setTxnType('Debit');
    };

    useEffect(() => {
        if (isWalletInfoVisible === true) {
            handleResetForTxn();
        }
    },[isWalletInfoVisible]);

    const handleSubmitForTransaction = async (event) => {
        try {
            event.preventDefault(); // avoid reload

            getWalletDetailsFromLocalIfExist(); // Fill WalletId

            const amount = parseInt(txnAmount.trim(' '), 10);

            if (isEmptyOrNil(txnType)) { alert('Transaction should be Debit/Credit'); return; }
            if (isEmptyOrNil(amount) || amount < 0) { alert('Transaction amount should be positive and required'); return; }
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
            if (!isEmptyOrNil(responseOfTxn.data.balance)) {
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
        } catch (err) {
            console.error(err);
            alert('Error occurred, Please try again');
        }
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

    const inputDescriptors = [
        {
            label: 'Amount',
            selectedValue: txnAmount,
            action: handleTxnAmountChange,
        },
        {
            label: 'Description',
            selectedValue: txnDescription,
            action: handleTxnDescriptionChange,
        },
    ];
    const selectDescriptors = {
        label: 'Choose type:',
        selectedValue: txnType,
        values: ['Debit', 'Credit'],
        action: handleTxnType,
    };

    return (
        <InputDetail
            className="module"
            label="Perform transaction:"
            inputDescriptors={inputDescriptors}
            selectDescriptors={selectDescriptors}
            action={handleSubmitForTransaction}
            resetAction={handleResetForTxn}
        />
    );
};

export default DoTransaction;
