import React from 'react';
import PropTypes from 'prop-types';
import './FAQCard.css';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';

const FAQCard = ({title, description }) => {
  const navigate  = useNavigate();
  return (
    <div className=" block-background info-card">
      <div className="info-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Button onClick={() => navigate('/ship-and-pay')}>ПОДРОБНЕЕ</Button>
      </div>
    </div>
  );
};

FAQCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  animation: PropTypes.string, // например, 'slide-left' или 'slide-up'
};

FAQCard.defaultProps = {
  animation: 'slide-up',
};

export default FAQCard;