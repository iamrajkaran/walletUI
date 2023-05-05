import './index.css';

const AppBody = (props) => {
    const { data, childComponent, } = props;

    // links
    return (
      <div>
        {childComponent && <props.childComponent
          data={data}
        />}
      </div>
    );
}

export default AppBody;
