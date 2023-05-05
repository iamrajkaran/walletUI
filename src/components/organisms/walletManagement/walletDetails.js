import Detail from '../../molecules/detail';

const WalletDetails = (props) => {
    const {
            walletInfo,
            removeCurrentWalletInfoFromLocal,
            setWalletInfo,
        } = props;

    const handleSubmitForUserLogout = () => {
        try {
            removeCurrentWalletInfoFromLocal();
            setWalletInfo({});
            alert('User removed');
        } catch (err) {
            alert('Something went wrong');
        }
    }

    return (
        <Detail
            className="module"
            label="Login details:"
            details={walletInfo}
            detailsReset={handleSubmitForUserLogout}
            detailsResetLabel="Logout"
        />
    );
};

export default WalletDetails;
