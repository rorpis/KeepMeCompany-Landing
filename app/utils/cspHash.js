import crypto from 'crypto';

export function generateCSPHash(content) {
  const hash = crypto.createHash('sha256')
    .update(content)
    .digest('base64');
  return `'sha256-${hash}'`;
}

// Helper to print hashes during development
export function logScriptHashes(scripts) {
  scripts.forEach((script, index) => {
    const hash = generateCSPHash(script);
  });
} 