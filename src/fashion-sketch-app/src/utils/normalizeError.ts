/**
 * Converts any API error into a plain string suitable for storing in Redux state.
 * NestJS can return message as a string, array of strings, or the full error object.
 */
export function normalizeError(err: any, fallback: string): string {
  const msg = err?.response?.data?.message;
  if (typeof msg === "string") return msg;
  if (Array.isArray(msg) && msg.length > 0) return String(msg[0]);
  if (typeof err?.message === "string") return err.message;
  return fallback;
}
