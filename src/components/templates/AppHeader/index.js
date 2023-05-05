import './index.css';

const AppHeader = (props) => {
    const { data } = props;
    const { links, } = data;

    return <div className="links-container">
            {links.map((item, index) => (
                <span key={index}><a href={item.url}>{item.text}</a></span>
            ))}
        </div>
}

export default AppHeader;
