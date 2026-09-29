import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"

export const ADMIN_COOKIE_NAME = "sidpooja_admin"
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  return secret && secret.length >= 32 ? secret : null
}

export function adminPasswordIsValid(candidate: unknown) {
  const expected = process.env.ADMIN_PASSWORD
  const secret = sessionSecret()
  if (typeof candidate !== "string" || !expected || !secret) return false

  const candidateHash = createHmac("sha256", secret).update(candidate).digest()
  const expectedHash = createHmac("sha256", secret).update(expected).digest()
  return timingSafeEqual(candidateHash, expectedHash)
}

export function createAdminSession() {
  const secret = sessionSecret()
  if (!secret) return null

  const expiresAt = Date.now() + ADMIN_SESSION_SECONDS * 1000
  const payload = `${expiresAt}.${randomBytes(32).toString("base64url")}`
  const signature = createHmac("sha256", secret).update(payload).digest("base64url")
  return `${payload}.${signature}`
}

export function hasAdminSession(cookieHeader: string | null) {
  const secret = sessionSecret()
  if (!secret || !cookieHeader) return false

  const cookie = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
  if (!cookie) return false

  const value = cookie.slice(ADMIN_COOKIE_NAME.length + 1)
  const [expiresAtValue, nonce, signature, extra] = value.split(".")
  if (!expiresAtValue || !nonce || !signature || extra !== undefined) return false

  const expiresAt = Number(expiresAtValue)
  const now = Date.now()
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= now || expiresAt > now + ADMIN_SESSION_SECONDS * 1000 + 60_000) return false

  const payload = `${expiresAtValue}.${nonce}`
  const expectedSignature = createHmac("sha256", secret).update(payload).digest()
  let providedSignature: Buffer
  try {
    providedSignature = Buffer.from(signature, "base64url")
  } catch {
    return false
  }
  return providedSignature.length === expectedSignature.length && timingSafeEqual(providedSignature, expectedSignature)
}

export function adminCookie(value: string, maxAge: number) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""
  return `${ADMIN_COOKIE_NAME}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`
}

export function sameOriginRequest(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (!origin || !host) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}
