import React from "react";
import { tokenStorage } from "../shared/storage";

export const useIsMember = () => {
  const token = React.useMemo(() => tokenStorage.getToken(), []);

  return !!token;
};
