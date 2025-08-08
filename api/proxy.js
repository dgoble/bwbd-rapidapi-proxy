// /api/proxy.js
export default async function handler(req, res) {
  const RAPID_HOST = 'sportsbook-api2.p.rapidapi.com';
  const base = `https://${RAPID_HOST}`;

  try {
    // Accept any RapidAPI path, default to /v0/events/
    const path = (req.query.path || '/v0/events/').toString();
    const url = new URL(path.startsWith('/') ? path : `/${path}`, base);

    // Copy all query params except 'path'
    Object.entries(req.query).forEach(([k, v]) => {
      if (k === 'path') return;
      if (Array.isArray(v)) v.forEach(val => url.searchParams.append(k, String(val)));
      else if (v !== undefined) url.searchParams.set(k, String(v));
    });

    const r = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY, // set in Vercel
        'x-rapidapi-host': RAPID_HOST,
      },
    });

    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    res.status(500).json({ error: 'proxy_error', message: err?.message || 'unknown' });
  }
}
