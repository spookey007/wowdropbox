import axios from "axios";
import { serverPath } from "./keys";
import CryptoJS from "crypto-js";

export const validateToken = () => {
  try {
    const getPass = new Date().toISOString();
    const newDt = new Date(getPass).getTime();
    const base64Credentials = btoa(`luckyBox:${newDt}`);
    const crd = Encrypt(base64Credentials);
    const authHeader = `${crd}`;
    return authHeader;
  } catch (error) {
    console.log("error", error);
  }
};

const Encrypt = (cipher) => {
  const PUBLICK_KEY = "";
  // Decrypt
  if (cipher) {
    const ciphercard = CryptoJS.AES.encrypt(cipher, PUBLICK_KEY).toString();
    return ciphercard;
  }
};

export const withoutAuth = () => {
  return axios.create({
    baseURL: `${serverPath}`,
  });
};

export const userInstance = () =>
  axios.create({
    baseURL: `${serverPath}`,
    headers: {
      Authorization: `${"Bearer "}${localStorage.getItem("luckyBox#@user")}`,
    },
  });
export const gameInstance = () =>
  axios.create({
    baseURL: `${serverPath}`,
    headers: {
      Authorization: `${"Bearer "}${localStorage.getItem("luckyBox#@user")}`,
    },
  });
