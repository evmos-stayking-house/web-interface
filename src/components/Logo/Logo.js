import { useTheme } from '@mui/material/styles';

const Logo = () => {
  const theme = useTheme();

  return <div style={{ fontSize: 18, fontWeight: 800 }}>StayKing Finance</div>;
};

export default Logo;
