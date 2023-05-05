import AppHeader from '../../components/templates/AppHeader/index.js';
import AppBody from '../../components/templates/AppBody/index.js';
import './index.css';
import React from 'react';

const Home = (props) => {
  return (
    <div className= "home">
      <div className ="container-fluid">
        <div className ="row app-header">
            <AppHeader
              data={props.headerProps}
            />
        </div>
        <div className ="row app-body">
            <AppBody
              data={props.bodyProps}
              childComponent={props.childComponent}
            />
        </div>
      </div>
    </div>
  );
}

export default Home;
