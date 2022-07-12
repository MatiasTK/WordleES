import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

function encriptarPalabra(palabra) {
  return CryptoJS.AES.encrypt(palabra, secretKey).toString();
}

function desencriptarPalabra(encriptado) {
  return CryptoJS.AES.decrypt(encriptado, secretKey).toString(CryptoJS.enc.Utf8);
}

export { encriptarPalabra, desencriptarPalabra };
