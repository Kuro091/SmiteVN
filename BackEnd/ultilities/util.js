// Settings
const config = require("config");
const crypto = require("crypto");
const fs = require("fs");
var dateFormat = require("dateformat");

const getMD5Hash = (input) => {
  var crypto = require("crypto");
  var hash = crypto.createHash("md5").update(input).digest("hex");
  return hash;
};

const getSignature = (endpoint) => {
  const devKey = config.get("devKey");
  const authKey = config.get("authKey");
  const timeStamp = dateFormat(
    new Date().toLocaleString("en-US", {
      timeZone: "Etc/UTC",
    }),
    "yyyymmddHHMMss"
  );

  return getMD5Hash(devKey + endpoint + authKey + timeStamp);
};

const getUrlForSession = (endpoint, signature) => {
  const devKey = config.get("devKey");
  const urlPrefix = config.get("urlPrefix");
  const timeStamp = dateFormat(
    new Date().toLocaleString("en-US", {
      timeZone: "Etc/UTC",
    }),
    "yyyymmddHHMMss"
  );

  return (
    urlPrefix + endpoint + "/" + devKey + "/" + signature + "/" + timeStamp
  );
};

const getUrl = (endpoint, signature, session) => {
  const urlPrefix = config.get("urlPrefix");
  const devKey = config.get("devKey");
  const timeStamp = dateFormat(
    new Date().toLocaleString("en-US", {
      timeZone: "Etc/UTC",
    }),
    "yyyymmddHHMMss"
  );
  const languageCode = "1";

  return (
    urlPrefix +
    endpoint +
    "/" +
    devKey +
    "/" +
    signature +
    "/" +
    session +
    "/" +
    timeStamp +
    "/" +
    languageCode
  );
};

module.exports = { getMD5Hash, getUrl, getSignature, getUrlForSession };
