import 'mocha';
import 'chai-http'; // for types
import * as chai from 'chai';
import MongoDB from '../../src/MongoDB';

const url = 'mongodb://admin:p1230h6t34qd4i7ex@localhost:27017/aspiritytemplate?authSource=admin&connectTimeoutMS=2000';
const fakeUrl = 'mongodb://admin:password@localhost:27777/aspiritytemplate?authSource=admin&connectTimeoutMS=2000';
// todo: make it better

chai.use(require('chai-http'));

describe('Database test', () => {
  it('Connection to db with wrong url should throw error', async () => {
    const fakeDb = new MongoDB(fakeUrl);
    return new Promise(async (resolve, reject) => {
      try {
        await fakeDb.connect();
        reject('should be error');
      } catch (e) {
        resolve('error occured');
      } finally {
        await fakeDb.disconnect();
      }
    })
  });

  it('Connect to db should work', async () => {
    return new Promise(async (resolve, reject) => {
      const correctDb = new MongoDB(url);
      try {
        await correctDb.connect();
        await correctDb.disconnect();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
});
