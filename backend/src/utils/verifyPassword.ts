import crypto from "crypto"

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hashedPassword.split(":")
    crypto.pbkdf2(
      plainPassword,
      salt,
      1000,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err)
        resolve(key === derivedKey.toString("hex"))
      }
    )
  })
}
