import { useState } from "react";
const useHeader = () => {
  const [friendsVisible, setFriendsVisible] = useState<boolean>(false);

  const handleOnHeaderClick = () => setFriendsVisible(!friendsVisible);

  return { friendsVisible, handleOnHeaderClick };
};

export default useHeader;
