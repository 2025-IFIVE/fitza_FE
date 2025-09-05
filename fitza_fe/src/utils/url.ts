export function toAbsoluteUrl(input?: string, base?: string) {
  if (!input) return "";
  // 이미 절대 URL이면 그대로
  if (/^https?:\/\//i.test(input)) return input;
  // 상대 경로면 base 붙이기 (base 없으면 루트 기준)
  const b = (base ?? "").replace(/\/+$/, "");
  const p = input.replace(/^\/+/, "");
  return b ? `${b}/${p}` : `/${p}`;
}