
const USER_KEY = "user";
const TOKEN_KEY = "access_token";
const SESSION_ID = "session_id";
/**
 * Lưu thông tin user và token vào localStorage
 */
export const setUserAuth = (user, token, session_id) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(SESSION_ID, session_id);
};

/**
 * Lấy thông tin user từ localStorage
 */
export const getUserAuth = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Lấy SESSION_ID từ localStorage
 */
export const getCurrentSessionID = () => {
  return localStorage.getItem(SESSION_ID);
};

/**
 * Lấy access token từ localStorage
 */
export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };
  
export const clearUserAuth = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
