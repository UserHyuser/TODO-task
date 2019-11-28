import * as convict from 'convict';
import * as path from 'path';

const config = convict({
  env: {
    doc: 'Application environment',
    format: ['production', 'dev', 'qa', 'demo'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  http: {
    url: {
      doc: 'Base server url',
      format: String,
      default: 'http://localhost:8080',
      env: 'APP_URL',
    },
    port: {
      doc: 'Base server port',
      format: 'port',
      default: 8080,
      env: 'APP_PORT',
    },
  },
  version: {
    doc: 'Current version',
    format: String,
    default: 'v1',
    env: 'APP_VERSION',
  },
  db: { // Заменил адрес ДБ
    uri: {
      doc: 'Mongodb connection URI',
      format: String,
      default: 'mongodb+srv://userdb:9R89pNDCLx8z1CcQ@cluster0-bx7mg.mongodb.net/TODOdb?retryWrites=true&w=majority',
      env: 'MONGO_URI',
    },
  },
  jwt: {
    secret: {
      doc: 'JWT secret',
      format: String,
      default: '255G7pgj9eAAjiK',
    },
    expiresIn: {
      doc: 'Expressed in seconds or a string describing a time span zeit/ms',
      format: String || Number,
      default: '7 days',
    },
  },
  bitcoinUrl: {
    doc: 'External api url for fetching bitcoin price',
    format: String,
    default: 'https://api.coinmarketcap.com/v1/ticker/bitcoin/',
  },
  captcha: {
    url: {
      doc: 'Google url for captcha verification',
      format: String,
      default: 'https://www.google.com/recaptcha/api/siteverify',
    },
    secret: {
      doc: 'Google recaptcha secret key',
      format: String,
      default: '6LfOZF8UAAAAAJ_I2pg4nIuxnuN2ySz4E8wUvz8X',
    }
  },
});

const env = config.get('env');
const envFile = path.resolve(__dirname, 'env', `${env}.json`);

config.loadFile(envFile);
config.validate();

export default config;
