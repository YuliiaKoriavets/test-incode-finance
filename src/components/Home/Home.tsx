import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import {
  HomeWrapper,
  Logo,
  LogoPart,
  Wrapper,
  Title,
  Decor,
  TextWrapper,
  Text,
  Button,
  Img,
} from './Home.styles';

export default function Home() {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      await dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <HomeWrapper>
      <Logo>InCode</Logo>
      <LogoPart>Finance</LogoPart>
      <Wrapper>
        <Title>Congratulations</Title>
        <Decor />

        <TextWrapper>
          <Text>
            Now you are on the main page. Soon we will provide you with detailed feedback on the
            result of your work
          </Text>
        </TextWrapper>
        <Button type="button" onClick={handleClick}>
          Log Out
        </Button>
        <Img />
      </Wrapper>
    </HomeWrapper>
  );
}
