import { headers } from "next/headers";

export async function getIsMobile() {
  const hdr = await headers();
  const userAgent = hdr.get("user-agent") ?? "";
  return /Android|iPhone|Mobile/i.test(userAgent);
}
