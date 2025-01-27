// Action to login
export const login = (userName) => ({
  type: "LOGIN",
  payload: { userName },
});

// Action to logout
export const logout = () => ({
  type: "LOGOUT",
});
