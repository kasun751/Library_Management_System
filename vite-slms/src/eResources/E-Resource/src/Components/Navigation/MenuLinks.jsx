import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './MenuLinks.css'

const MenuLinks = (props) => {
    return (
        <div className="linksContainer">
            <Link to={props.src}>{props.title}</Link>
        </div>
    );
};

MenuLinks.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default MenuLinks;
