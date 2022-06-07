export default cookieMonster;

const cookieMonster = () => {
  return {
    setCookie(cname, cvalue, exdays = 1) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    // Alias for setCookie
    bakeCookie(cname, cvalue, exdays = 1) {
      this.setCookie(cname, cvalue, exdays);
    },

    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    // Aliases for getCookie
    readCookie(cname) {
      this.getCookie(cname);
    },
    findCookie(cname) {
      this.getCookie(cname);
    },

    deleteCookie(cname) {
      document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    },

    // Alias for deleteCookie
    eatCookie(cname) {
      this.deleteCookie(cname);
    },

    hasCookie(cname) {
      return "" !== this.getCookie(cname);
    },
  };
};
