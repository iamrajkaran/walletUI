import { isEmptyOrNil } from '../../../utilities';
import './index.css';

const InputDetail = (props) => {
  const {
    label,
    inputDescriptors,
    selectDescriptors,
    action,
    resetAction,
  } = props;

  return (
    <div className="module">
      <label className="label-title" >{label} </label>
      {Object.entries(inputDescriptors).map(([key, value]) => (
        <div className="row" key={key}>
          <input
            key={key}
            className="input-field"
            type="text"
            placeholder={value.label}
            value={value.selectedValue}
            onChange={value.action} />
        </div>
      ))}


      { !isEmptyOrNil(selectDescriptors) &&
          <>
            <div className="row">
              <label className="label-title">{selectDescriptors.label} </label>
              <select className="select-option" onChange={selectDescriptors.action} value={selectDescriptors.selectedValue}>
                {selectDescriptors.values.map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </>
      }

      <div className="row">
        <button className="submit-btn" onClick={action}>Submit</button>
        <button className="reset-btn" onClick={resetAction}>Reset</button>
      </div>
    </div>
  );
};

export default InputDetail;
