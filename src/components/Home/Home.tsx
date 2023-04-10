import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';

export default function Home() {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      await dispatch(logout());
      // handle success
    } catch (err) {
      console.log(err);

      // handle error
    }
  };
  return (
    <div>
      <div>
        <h3>InCode</h3>
        <p>Finance</p>
      </div>
      <div>
        <h2>Congratulations</h2>
      </div>
      <p>
        Now you are on the main page. Soon we will provide you with detailed feedback on the result
        of your work
      </p>
      <button type="button" onClick={handleClick}>
        Log Out
      </button>
    </div>
  );
}
