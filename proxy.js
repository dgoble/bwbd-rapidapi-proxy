export default async function handler(req, res) {
  const { endpoint } = req.query;

  if (!process.env.API_KEY) {
    return res.status(500).json({ error: 'API key not set in environment variables' });
  }

  try {
    const apiRes = await fetch(`https://YOUR-API-ENDPOINT.com/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });

    const data = await apiRes.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
