const axios = require('axios');

module.exports = {
  createCheckout: async (amount, description) => {
    const response = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      {
        amount,
        currency: 'EUR',
        checkout_reference: require('crypto').randomBytes(16).toString('hex'),
        description
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.id;
  }
};