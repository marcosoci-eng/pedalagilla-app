module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(500).json({ error: 'STRIPE_SECRET_KEY non configurata' });

  try {
    const { paymentMethodId, amount, bikeIds } = req.body;
    if (!paymentMethodId || !amount) return res.status(400).json({ error: 'Parametri mancanti' });

    const params = new URLSearchParams({
      amount: String(Math.round(amount * 100)),
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: 'true',
      capture_method: 'manual',
      'automatic_payment_methods[enabled]': 'true',
      'automatic_payment_methods[allow_redirects]': 'never',
      'metadata[bikeIds]': Array.isArray(bikeIds) ? bikeIds.join(',') : (bikeIds || ''),
    });

    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();
    if (!response.ok) return res.status(400).json({ error: data.error?.message || 'Errore Stripe' });

    res.json({ success: true, paymentIntentId: data.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
