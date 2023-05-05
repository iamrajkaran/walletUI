import './index.css';
import { useState, useEffect, } from 'react';
import { isEmptyOrNil } from '../../../utilities';
import Table from '../../molecules/table';

const Transactions = (props) => {
    const LIMIT_TXNS = 10;
    const { userTransactionService, walletService, } = props.data;
    const {
        getUserTransactions,
    } = userTransactionService;
    const  {
        getWalletInfoFromLocal,
    } = walletService;

    // Get/Set States
    const [transactions, setTransactionsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const responseOfUserDetails = getWalletInfoFromLocal();

      const getTransactionsData = async () => {
        setLoading(true);
        const responseUserTxn = await getUserTransactions({
            walletId: responseOfUserDetails.id,
            skip: 0,
            limit: LIMIT_TXNS,
          });

        if (responseUserTxn.success === false) {
          console.error('Something went wrong');
          return;
        }

        setTransactionsData(responseUserTxn.data);
        setLoading(false);
      }

      // Call if wallet id exist
      if (!isEmptyOrNil(responseOfUserDetails)) getTransactionsData();
    }, []);


    // View Render conditional statements
    const isTransactionDataLoading = () => loading === true;
    const isTransactionDataAvail = () => (transactions && transactions.length > 0);

    const transactionSchema = [
      { label: 'TransactionID', key: 'id' , isSort: false,},
      { label: 'WalletId', key: 'walletId' , isSort: false,},
      { label: 'Amount ↨', key: 'amount', isSort: true, },
      { label: 'Balance ↨', key: 'balance', isSort: true, },
      { label: 'Description', key: 'description' , isSort: false,},
      { label: 'Date ↨', key: 'date', isSort: true, },
      { label: 'Type', key: 'type' , isSort: false,}
    ];

    return (
      <>
        {
          (!isTransactionDataLoading() && isTransactionDataAvail()) &&
            <Table
            data={transactions}
            setData={setTransactionsData}
            schema={transactionSchema}
          />
        }

        {
          isTransactionDataLoading() &&
            <span>Loading....</span>
        }

        {
          (!isTransactionDataAvail() && !isTransactionDataLoading()) &&
            <span>No transaction exist</span>
        }
      </>
    );
}

export default Transactions;
