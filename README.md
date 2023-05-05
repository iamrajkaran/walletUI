1. Functional Requirements
    
    Page 1,
        1. Initially if no wallet is configured,
        show a simple input field asking for Username,
        optional initial balance field and Submit button.

        When the user clicks the button, use the data
        provided to initialize a new wallet.

        2. Save the wallet id in local storage which can be
        used next time if the user revisits the page.

        Use the wallet id to show the wallet balance and
        name.

        3. Once we have the wallet initialized, show
        a section for doing transactions

        4. Once the transaction is completed, the wallet
        balance should automatically update to reflect the
        transaction

        4.Show a link in page 1 to visit page 2, Wallet
        transactions

    
    Page 2
        5. show a table of all the transactions
        available for the wallet

        6. The transaction table should support following
            1.Pagination of data
            2.Ability to sort transactions by date and amount
            3.Export CSV file of all transactions available

2. What is not covered?
    
    Better CSS for viewing
    media queries

3. Environment used:
    
    Node v12.22.11
    
You can use back for this with this repo: https://github.com/iamrajkaran/walletSystem
