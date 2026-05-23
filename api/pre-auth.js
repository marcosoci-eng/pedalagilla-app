const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { paymentMethodId, amount, bikeIds } = req.body;
    if (!paymentMethodId || !amount) return res.status(400).json({ error: 'Parametri mancanti' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in centesimi
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
      capture_method: 'manual', // solo autorizza, non addebita
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      metadata: { bikeIds: Array.isArray(bikeIds) ? bikeIds.join(',') : bikeIds || '' },
    });

    res.json({ success: true, paymentIntentId: paymentIntent.id });
  } catch (e) {
    console.error('Stripe pre-auth error:', e.message);
    res.status(400).json({ error: e.message });
  }
};
