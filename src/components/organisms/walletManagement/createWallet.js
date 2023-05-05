import InputDetail from '../../molecules/inputDetail';
import './index.css';
import { useState, useEffect, } from 'react';
import { isEmptyOrNil } from '../../../utilities';

const CreateWallet = (props) => {
    const {
        createWallet,
        getWalletDetailsFromLocalIfExist,
        isWalletInfoVisible,
    } = props;

    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');

    const handleResetForWalletRegd = (event) => {
        if (!isEmptyOrNil(event)) event.preventDefault();

        setName('');
        setBalance('');
    };

    useEffect(() => {
        console.log('calleld');
        if (isWalletInfoVisible === false) {
            handleResetForWalletRegd();
        }
    },[isWalletInfoVisible]);

    const handleNameChange = (event) => {
        // event.preventDefault();
        console.log('22');
        setName(event.target.value);
    };
    const handleBalanceChange = (event) => {
        event.preventDefault();
        setBalance(event.target.value);
    };

    const handleSubmitForWalletRegd = async (event) => {
        event.preventDefault(); // avoid reload
        const amount = parseInt(balance.trim(' '), 10);

        if (isEmptyOrNil(name)) {
            alert('Please mention name');
            return;
        }

        if (isNaN(amount) || amount < 0) {
            alert('Please mention correct balance');
            return;
        }

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

    const inputDescriptors = [
        {
            label: 'Name',
            selectedValue: name,
            action: handleNameChange,
        },
        {
            label: 'Balance',
            selectedValue: balance,
            action: handleBalanceChange,
        }
    ];

    return (
        <InputDetail
            className="module"
            label="Enter new Wallet:"
            inputDescriptors={inputDescriptors}
            action={handleSubmitForWalletRegd}
            resetAction={handleResetForWalletRegd}
        />
    );
};

export default CreateWallet;
