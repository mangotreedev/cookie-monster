// TODO: Research RFC 6265 encoding, link the following in the readme https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html
// TODO: Set up with webpack and babel to make it compatible across multiple browsers
// TODO: Beef up readme
// TODO: Add tests?
// TODO: Some form of browser compatibility testing
// TODO: Cookie encryption
// TODO: Add error handling

export const cookieMonster = () => {

  function convertToMilliSeconds(extime) {
    const daySeconds = (extime.days || 0) * 24 * 60 * 60 * 1000;
    const hourSeconds = (extime.hours || 0) * 60 * 60 * 1000;
    const minSeconds = (extime.minutes || 0) * 60 * 1000;
    return daySeconds + hourSeconds + minSeconds;
  }

  function pickRandomSong() {
    const songArr = [
      `
      C is for cookie, that's good enough for me, yeah
      C is for cookie, that's good enough for me, ay
      C is for cookie, that's good enough for me, oh
      Cookie, cookie, cookie starts with C
      Yeah, cookie! Disco cookie!
      What you say?
      Well, I said C is for cookie, that's good enough for me
      C is for cookie, that's good enough for me
      C is for cookie, that's good enough for me
      That's good enough for me, yeah
      Cookie, cookie, cookie starts with C
      Cookie, cookie, cookie, cookie
      `,
      `
      The lights were shining
      The night was fine
      And me was having a real great time
      Then me got careless
      Me don't know how
      But me had something me can't find now!

      Me lost me cookie at the disco
      (Girls: Please come back!)
      Me lost me cookie in the boogie music

      Cookie Monster: Me lost me cookie at the disco
      (Girls: Ooh-ooh)
      Me want it back
      `,
      `
      Me got a wish on me mind
      It is a chocolate chip kind
      Me look at you and me tell
      You may have snickerdoo-del

      Me trade me soul for a bite
      Me spell it out black and white
      Me look at you and me see
      You like an elf in a tree

      You, cookie-showing
      And me hunger growing
      Let's get skim milk flowing
      We'll start this snack going baby

      Hey, me just met you
      And this is crazy
      But you got cookie
      So share it maybe

      It hard to look at
      You snack baby
      But you got cookie
      So share it maybe

      Hey, me just met you
      And this is crazy
      But you got cookie
      So share it maybe

      Cuppy-cake with frosting
      It no faze me
      But you got cookie
      So share it maybe

      You took you time with the bite
      Me trying to stay polite
      Me start to really freak out
      Please someone call the Girl Scout

      Me no grumble or grouse
      This take its toll on me house
      Me going off me rocker
      Please be me Betty Crocker

      You, cookie-showing
      And me hunger growing
      Let's get skim milk flowing
      We'll start this snack going baby

      Hey, me just met you
      And this is crazy
      But you got cookie
      So share it maybe

      It hard to look at
      You snack baby
      But you got cookie
      So share it maybe
      Hey, me just met you
      And this is crazy
      But you got cookie
      So share it maybe

      Pie and ice cream
      It no faze me
      But you got cookie
      So share it maybe

      Before you came into me life
      Me missed you so bad
      Me missed you so bad
      Me missed you so, so bad

      Before you came into me life
      Me missed you so bad
      And you should know that
      Me missed you so, so bad, bad, bad, bad, bad

      It hard to look at
      Your snack, baby
      But you got cookie
      So share it maybe

      Hey, me just met you
      And this is crazy
      But you got cookie
      So share it maybe

      Chocolate pudding
      It no faze me
      But you got cookie
      So share it maybe

      (sigh)

      🍪 COOOKIE! Om-non-nom-nom... 🍪
      `,
    ];
    return songArr[Math.floor(Math.random() * songArr.length)];
  }

  function processOptions(rawOptions) {
    const options = {extime: {}};
    if (rawOptions.extime && (rawOptions.extime.days || rawOptions.extime.hours || rawOptions.extime.minutes)) {
      options.extime.days = rawOptions.extime.days || 0;
      options.extime.hours = rawOptions.extime.hours || 0;
      options.extime.minutes = rawOptions.extime.minutes || 0;
    } else {
      options.extime.days = 1;
    }

    options.path = rawOptions.path || '/';

    options.secure = rawOptions.secure ? 'secure' : '';
  }

  return {
    singCookieSong() {
      console.log(pickRandomSong());
    },

    // Add Test
    setCookie(cname, cvalue, rawOptions = {}) {
      const options = processOptions(rawOptions);
      const d = new Date();
      d.setTime(d.getTime() + convertToMilliSeconds(options.extime));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + options.path + ';' + options.secure;
    },

    // Alias for setCookie
    bakeCookie(cname, cvalue, rawOptions = {}) {
      this.setCookie(cname, cvalue, rawOptions);
    },

    // Add Test
    getCookie(cname) {
      if (!cname) {
        throw 'Missing Argument Exception';
      }

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
    // Add Test
    deleteCookie(cname) {
      if (!cname) {
        throw "Missing Argument Exception";
      }

      document.cookie =
      cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    },

    // Alias for deleteCookie
    eatCookie(cname) {
      this.deleteCookie(cname);
    },
    // Add Test
    hasCookie(cname) {
      if (!cname) {
        throw "Missing Argument Exception";
      }

      return "" !== this.getCookie(cname);
    },
  };
};
