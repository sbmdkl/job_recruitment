let token;
let decoded;
let isLoggedIn;

export const storeDecoded = (dec) => {
   decoded = dec;
   localStorage.setItem('decoded', JSON.stringify(dec));
};

export const storeToken = (tkn) => {
   token = tkn;
   localStorage.setItem('token', tkn);
};

export const getDecoded = () => {
   if (decoded) return decoded;
   decoded = JSON.parse(localStorage.getItem('decoded'));
   return decoded;
};

export const getToken = () => {
   if (token) return token;
   token = localStorage.getItem('token');
   return token;
};

export const doesTokenExist = () => {
   if (localStorage.getItem('token') && localStorage.getItem('decoded')) return true;
   return false;
};

export const handleLogout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('decoded');
   isLoggedIn = false;
   return;
};

export const getLoginState = () => {
   if (isLoggedIn === undefined) {
      if (localStorage.getItem('token') && localStorage.getItem('decoded')) {
         isLoggedIn = true;
         return true;
      } else {
         return false;
      }
   }
   return isLoggedIn;
};

export const setLoginState = (bool) => {
   isLoggedIn = bool;
   return;
};
