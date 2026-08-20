const DEFAULT_RULES = [
  { id: "provenance", pattern: /(?:^|[^a-z0-9_])provenance(?:$|[^a-z0-9_])/iu },
  { id: "confidence", pattern: /(?:^|[^a-z0-9_])(?:confidence|extraction\s+confidence)\s*[:=]?/iu },
  { id: "source", pattern: /(?:^|[^a-z0-9_])(?:source|source_url|sourceurl)\s*[:=]/iu },
  { id: "debug", pattern: /\[debug\]|(?:^|[^a-z0-9_])(?:parser|imported_from|enriched_at)\s*[:=]/iu },
];

export function inspectPublicText(value, rules = DEFAULT_RULES) {
  if (value == null || String(value).trim() === "") return { safe: true, findings: [] };
  const text = String(value).trim();
  const findings = rules.filter((rule) => rule.pattern.test(text)).map((rule) => rule.id);
  return { safe: findings.length === 0, findings };
}

export function sanitizePublicText(value, options = {}) {
  const result = inspectPublicText(value, options.rules ?? DEFAULT_RULES);
  return result.safe ? String(value).trim() : (options.fallback ?? null);
}

export { DEFAULT_RULES };
