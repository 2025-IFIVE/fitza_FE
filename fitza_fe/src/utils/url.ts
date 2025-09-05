// 절대면 그대로, 상대면 base 붙이기, 'https//' 오타 교정, 이중 프리픽스 방지
function normalizeAbsoluteUrl(input?: string, base?: string) {
  if (!input) return "";

  let u = String(input).trim();

  // 'https//...' 또는 'http//' 오타 교정 (콜론 빠진 경우)
  u = u.replace(/^https(?=\/\/)/i, "https:").replace(/^http(?=\/\/)/i, "http:");

  // '...fitza.cloudhttps://...' 같이 앞에 뭔가 붙은 경우 → 마지막 http(s)부터 사용
  const idx = Math.max(u.lastIndexOf("https://"), u.lastIndexOf("http://"));
  if (idx > 0) u = u.slice(idx);

  // 절대면 그대로 반환
  if (/^https?:\/\//i.test(u)) return u;

  // 상대면 base 보강
  const b = (base ?? "").replace(/\/+$/, "");
  const p = u.replace(/^\/+/, "");
  return b ? `${b}/${p}` : `/${p}`;
}