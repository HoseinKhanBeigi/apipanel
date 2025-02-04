export function setCookie(name, value, hours) {
  if (process.env.BROWSER) {
    // let expires = '';
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      // expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}; path=/; secure;`;
  } else {
  }
}

export function deleteCookie(name) {
  setCookie(name, "", -1);
}
