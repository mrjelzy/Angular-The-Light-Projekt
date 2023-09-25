import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'API_URI',
      'PAYMENT_API_KEY'
    ])
  ]
}
