// TODO: Change the way expire days is passed
// TODO: Allow users to provide the path, both for set and delete
// TODO: Research RFC 6265 encoding
// TODO: Set mangotree as the scoping organization
// TODO: Set up with webpack and babel to make it compatible across multiple browsers
// TODO: Beef up readme
// TODO: Add tests?
// TODO: Add secure attribute
// TODO: Some form of browser compatibility testing
// TODO: Cookie encryption
// TODO: Add cookie monster song if connected properly

let document = {}



export const cookieMonster = () => {

  function convertToMilliSeconds(extime) {
    const daySeconds = (extime.days || 0) * 24 * 60 * 60 * 1000;
    const hourSeconds = (extime.hours || 0) * 60 * 60 * 1000;
    const minSeconds = (extime.minutes || 0) * 60 * 1000;
    return daySeconds + hourSeconds + minSeconds;
  }

  return {
    setCookie(cname, cvalue, extime = { days: 1, hours: 0, minutes: 0 }, path = "/") {
      const d = new Date();
      d.setTime(d.getTime() + convertToMilliSeconds(extime));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
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
      document.cookie =
        cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    },

    // Alias for deleteCookie
    eatCookie(cname) {
      this.deleteCookie(cname);
    },

    hasCookie(cname) {
      return "" !== this.getCookie(cname);
    },
  };
};;

cookieMonster().setCookie("test2", "value", { days: 4 });
