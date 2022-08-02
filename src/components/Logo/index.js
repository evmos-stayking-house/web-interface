import PropTypes from 'prop-types';

import Logo from './Logo';

const LogoSection = ({ sx, to }) => (
  <>
    <Logo />
  </>
);

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
