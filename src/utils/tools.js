const tools = {};

/**
 * 获取cookie
 * @param {String} name
 */
tools.getCookie = (name) => {
  if (!name) return null;
  const cookie = document.cookie;
  const arr = cookie.split('; ');
  let val = null;

  arr.forEach((item) => {
    const key = item.split('=')[0];
    const value = item.split('=')[1];
    if (key === name) {
      val = value;
    }
  });

  return val;
};

tools.setCookie = (name, value, options = {}) => {
  if (!name || !value) return;

  let cookie = `${name}=${value}`;
  let expires = '';

  options.path = options.path || '/';
  if (options.exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (options.exdays * 24 * 60 * 60 * 1000));
    expires = d.toGMTString();
  }
  options.domain = options.domain || window.location.hostname;

  document.cookie = cookie + '; path=' + options.path + '; expires=' + expires + '; domain=' + options.domain;
};

export default tools;