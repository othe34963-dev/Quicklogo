type GenerateInput = {
  brandName: string;
  description: string;
  style: string;
  colors: string;
};

export async function generateLogo(input: GenerateInput): Promise<string> {
  // Production hook:
  // Send input to your preferred image model/provider here.
  // Return a hosted image URL from your storage/CDN.
  //
  // This starter returns a deterministic SVG data URL so the whole app
  // works immediately without an external AI key.

  const safe = input.brandName.replace(/[<>&'"]/g, "");
  const tagline = input.description.replace(/[<>&'"]/g, "").slice(0, 80);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    <rect width="1024" height="1024" fill="#f8fafc"/>
    <circle cx="512" cy="430" r="190" fill="#111827"/>
    <path d="M392 430h240M512 310v240" stroke="#fff" stroke-width="42" stroke-linecap="round"/>
    <text x="512" y="710" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="700" fill="#111827">${safe}</text>
    <text x="512" y="775" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#64748b">${tagline}</text>
    <text x="512" y="845" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#94a3b8">${input.style} • ${input.colors}</text>
  </svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
