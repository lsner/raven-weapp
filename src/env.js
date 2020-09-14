function getENV() {
  var currentSdk = null;
  if (typeof wx === "object") {
    currentSdk = wx;
  } else if (typeof swan === "object") {
    currentSdk = swan;
  } else if (typeof my === "object") {
    currentSdk = my;
  } else if (typeof tt === "object") {
    currentSdk = tt;
  } else if (typeof qq === "object") {
    currentSdk = qq;
  } else {
    console.error("sentry-miniapp 暂不支持此平台");
  }

  return currentSdk;
}

module.exports = {
  getENV: getENV
};
