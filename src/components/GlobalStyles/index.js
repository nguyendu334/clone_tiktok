import PropTypes from 'prop-types'
import './GlobalStyles.scss';

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired

}

export default function GlobalStyles({ children }) {
    return children;
}
