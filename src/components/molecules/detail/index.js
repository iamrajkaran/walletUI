import './index.css';

const Detail = (props) => {
    const { label, details, detailsReset, detailsResetLabel } = props;

    return (
      <div className="module">
              <label className="label-title" >{label} </label>

              {Object.entries(details).map(([key, value]) => (
                <label className="label-container" key={key}>{key}: {value}</label>
              ))}
              <div className="row">
                  <button className="logout-btn" onClick={detailsReset}>{detailsResetLabel}</button>
              </div>
      </div>
    );
};

export default Detail;
