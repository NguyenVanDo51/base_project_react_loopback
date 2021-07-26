import { useSelector } from "react-redux"
import { RootStateType } from "../../redux/store"
import { UserType } from "../Types";

const useUser = () => {
  const { user } = useSelector(({ persistReducer }: RootStateType) => persistReducer);

  return user || null;
}

export default useUser;