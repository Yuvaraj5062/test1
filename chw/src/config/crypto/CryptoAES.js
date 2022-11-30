import CryptoJS from "crypto-js"
let key = CryptoJS.enc.Utf8.parse('0803202214361035');
let iv = CryptoJS.enc.Utf8.parse('0803202214361035');

// Methods for the encrypt and decrypt Using AES
export function encrypt(text) {
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    //console.log('Encrypted  :' + encrypted);

    return encrypted.toString();
}

export function decrypt(text) {
    var decrypted = CryptoJS.AES.decrypt(text, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    //console.log('dicrypted = ' + decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8)
   
}