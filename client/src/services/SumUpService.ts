import axios, { AxiosInstance } from 'axios';

type CreateCheckoutPayload = {
  amount: number;
  currency: string;
  pay_to_email: string;
  description?: string;
  reference_id?: string;
};

type CheckoutResponse = {
  id: string;
  status: string;
  payment_url: string;
  valid_until: string;
};

class SumUpService {
  private readonly apiClient: AxiosInstance;

  constructor(private accessToken: string) {
    this.apiClient = axios.create({
      baseURL: 'https://api.sumup.com/v0.1/checkouts',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createCheckout(payload: CreateCheckoutPayload): Promise<CheckoutResponse> {
    try {
      const response = await this.apiClient.post<CheckoutResponse>('', payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('SumUp API Error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw new Error('Failed to create checkout');
    }
  }
}

export default SumUpService;