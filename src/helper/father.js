const secretkey = 'I-am-not-your-father-555'

const to = (messageToencrypt) => {
    if (messageToencrypt) {
        var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey)
        return encryptedMessage.toString()
    } else {
        return null
    }
}

const from = (encryptedMessage) => {
    if (encryptedMessage) {
        var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretkey);
        var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedMessage;
    } else {
        return null
    }
}

export default {
    to,
    from
}