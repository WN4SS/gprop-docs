// First test account only. Approval always requires a verified email from Clerk.
export function isApprovedUser(user, approvedEmails) {
  if (!user || user.banned || user.locked) return false;
  const allow = new Set(approvedEmails.map(email => email.trim().toLowerCase()));
  return (user.emailAddresses || []).some(email =>
    email.verification?.status === 'verified' && allow.has(email.emailAddress.toLowerCase())
  );
}

export function resolveDoc(parts, manifest) {
  if (!parts.every(p => p && p !== '.' && p !== '..' && !/[\\/\0]/.test(p))) return null;
  const name = parts.join('/');
  const candidate = name === '' ? 'index.html' : manifest.has(name) ? name : `${name}/index.html`;
  return manifest.has(candidate) ? candidate : null;
}
