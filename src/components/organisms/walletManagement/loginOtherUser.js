import InputDetail from '../../molecules/inputDetail';
import './index.css';
import { useEffect, useState, } from 'react';
import { isEmptyOrNil } from '../../../utilities';

const LoginOtherUser = (props) => {
    const {
        getWalletInfo,
        saveWalletDetailsInLocalStorage,
        getWalletDetailsFromLocalIfExist,
        isWalletInfoVisible,
    } = props;

    const [walletId, setWalletId] = useState('');

    const handleWalletIdChange = (event) => {
        event.preventDefault();
        setWalletId(event.target.value);
    };

    const handleResetForLoginWithOtherUser = (event) => {
        if (!isEmptyOrNil(event)) event.preventDefault();
        setWalletId('');
    };

    useEffect(() => {
        if (isWalletInfoVisible === true) {
            handleResetForLoginWithOtherUser();
        }
    },[isWalletInfoVisible]);

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
        } catch (err) {
            console.error(err);
            alert('Error occured, Please try again');
        }
    };

    const inputDescriptors = [
        {
            label: 'WalletId',
            action: handleWalletIdChange,
            selectedValue: walletId,
        },
    ];

    return (
        <InputDetail
            className="module"
            label="Login with other user:"
            inputDescriptors={inputDescriptors}
            action={handleSubmitForUserChange}
            resetAction={handleResetForLoginWithOtherUser}
        />
    );
};

export default LoginOtherUser;
