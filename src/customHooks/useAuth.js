//components
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
