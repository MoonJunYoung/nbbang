import Cookies from "js-cookie";

export const tokenStorage = {
  getToken() {
    return Cookies.get("authToken");
  },
  setToken(newToken) {
    Cookies.set("authToken", newToken, {
      expires: 30,
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  },
};
