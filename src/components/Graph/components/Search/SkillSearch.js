import PropTypes from 'prop-types';
import React from 'react';
import { Label, Image, Grid } from 'semantic-ui-react';
import Search from './GraphSearch';

const resultRenderer = ({ title, image }) => {
  return(
    <div>
      <span>{title}</span>
      <Image style={{height:'20px', width: '20px'}} src={image} size='mini' circular />
    </div>
  );
};

resultRenderer.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
};

const SkillSearch = () => (
  <Search resultRenderer={resultRenderer} />
);

export default SkillSearch;