import PropTypes from 'prop-types';
import './ZeroMenu.css';

const ZeroMenu = ({ time  , address, phone}) => {
  return (
    <div className="zero-menu">
      <div className="zero-container">
        <div className="contact-info">
          <a href="/contacts">{ time}</a>
        </div>
        <div className="social">
          <a href="/contacts">{address}</a>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </div>
    </div>
  );
};

ZeroMenu.propTypes = {
  time: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
};

export default ZeroMenu;