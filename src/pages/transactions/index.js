import AppHeader from '../../components/templates/AppHeader/index.js';
import AppBody from '../../components/templates/AppBody/index.js';
import './index.css';
import React from 'react';

const Transactions = (props) => {
  const { walletService, headerProps, } = props;

  const renderHomePageTemplate = () => {
    return (
      <div className ="container-fluid">
        <div className ="row app-header">
            <AppHeader
              data={headerProps}
            />
        </div>
        <div className ="row app-body">
            <AppBody
              walletService={walletService}
            />
        </div>
      </div>);
  }

  return (
    <div className= "home">
      {renderHomePageTemplate()}
    </div>
  );
}

export default Transactions;
