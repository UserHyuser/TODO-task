import 'mocha';
import 'chai-http'; // for types
import * as chai from 'chai';
import Express from '../../src/Express';

chai.use(require('chai-http'));
const expect = chai.expect;
const app = new Express().app;

describe('Express test', () => {
  it('/GET version should return 0.0.1', async () => {
    const expectedVersion = 'v1'; // todo: get version from config
    const response = await chai.request(app).get('/api/version');
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('version').to.equal(expectedVersion);
    return new Promise((resolve) => resolve()); // we can`t use done callback with async :(
  });

  // region BAD TESTS never do like this! To see correct example - go to './unit' folder

  it('/GET example should return result "exampleController"', async () => {
    const expectedResult = 'exampleController';
    const response = await chai.request(app).get('/api/v1/example');
    expect(response.status).to.equal(200);
    expect(response.body).to.haveOwnProperty('result').to.equal(expectedResult);
    return new Promise((resolve) => resolve()); // we can`t use done callback with async :(
  });

  // todo: remove auth from getSum, replace with privateGet instead
  it('/GET example sum without auth should result as access denied', async () => {
    const expectedResult = 'exampleController';
    const response = await chai.request(app).get('/api/v1/example/sum').query({first: 1, second: 2});
    expect(response.status).to.equal(401);
    return new Promise((resolve) => resolve()); // we can`t use done callback with async :(
  });

  // endregion
});
