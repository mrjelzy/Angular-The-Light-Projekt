import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'DIRECTUS_API_KEY',
      'PAYMENT_API_KEY'
    ])
  ]
}
