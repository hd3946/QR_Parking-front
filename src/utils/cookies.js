function saveAuthToCookie(value) {
  this.$cookies.set(til_auth, value);
  //document.cookie = `til_auth=${value}`;
}

function saveUserToCookie(value) {
  this.$cookies.set(til_user, value);
  //document.cookie = `til_user=${value}`;
}

function saveQRurlToCookie(value) {
  this.$cookies.set(til_qr, value);
  //document.cookie = `til_qr=${value}`;
}

function getAuthFromCookie() {
  //const cookie = $cookies.get(til_auth);
  //return cookie;
  // return document.cookie.replace(
  //   /(?:(?:^|.*;\s*)til_auth\s*=\s*([^;]*).*$)|^.*$/,
  //   '$1',
  // );
}

function getUserFromCookie() {
  //return [this | Vue].$cookies.get(til_user);
  // return document.cookie.replace(
  //   /(?:(?:^|.*;\s*)til_user\s*=\s*([^;]*).*$)|^.*$/,
  //   '$1',
  // );
}

function getQRurlFromCookie() {
  //return this.$cookies.get(til_qr);
  // return document.cookie.replace(
  //   /(?:(?:^|.*;\s*)til_qr\s*=\s*([^;]*).*$)|^.*$/,
  //   '$1',
  // );
}

function deleteCookie(value) {
  //this.$cookies.remove(value);
  //document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  saveQRurlToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  getQRurlFromCookie,
  deleteCookie,
};
