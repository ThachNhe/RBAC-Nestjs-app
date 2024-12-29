var CryptoJS = require('crypto-js')

export function encrypt(text: string, secretKey: string): string {
  if (!text) return
  return CryptoJS.AES.encrypt(text, secretKey).toString()
}

export function decrypt(encryptedText: string, secretKey: string): string {
  if (!encryptedText) return

  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}
