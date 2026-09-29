import { neon } from "@neondatabase/serverless"

async function initializeRsvpDatabase() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return null

  const sql = neon(databaseUrl)
  await sql`
    CREATE TABLE IF NOT EXISTS rsvp_responses (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(254) NOT NULL,
      pre_wedding_attending BOOLEAN NOT NULL,
      pre_wedding_guest_count SMALLINT,
      wedding_attending BOOLEAN NOT NULL,
      wedding_guest_count SMALLINT,
      message VARCHAR(1000) NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      pre_wedding_response VARCHAR(10) NOT NULL DEFAULT 'no',
      wedding_response VARCHAR(10) NOT NULL DEFAULT 'no'
    )
  `
  await sql`
    ALTER TABLE rsvp_responses
      ADD COLUMN IF NOT EXISTS pre_wedding_response VARCHAR(10),
      ADD COLUMN IF NOT EXISTS wedding_response VARCHAR(10)
  `
  await sql`
    UPDATE rsvp_responses
    SET pre_wedding_response = COALESCE(pre_wedding_response, CASE WHEN pre_wedding_attending THEN 'yes' ELSE 'no' END),
        wedding_response = COALESCE(wedding_response, CASE WHEN wedding_attending THEN 'yes' ELSE 'no' END)
    WHERE pre_wedding_response IS NULL OR wedding_response IS NULL
  `
  await sql`
    ALTER TABLE rsvp_responses
      ALTER COLUMN pre_wedding_response SET DEFAULT 'no',
      ALTER COLUMN pre_wedding_response SET NOT NULL,
      ALTER COLUMN wedding_response SET DEFAULT 'no',
      ALTER COLUMN wedding_response SET NOT NULL
  `

  return sql
}

let databasePromise: ReturnType<typeof initializeRsvpDatabase> | undefined

export function getRsvpDatabase() {
  databasePromise ??= initializeRsvpDatabase()
  return databasePromise.catch((error: unknown) => {
    databasePromise = undefined
    throw error
  })
}
