import 'mocha';
import { expect } from 'chai';
import ExampleController from '../../src/controllers/v1/ExampleController';
// process.env.NODE_ENV = 'test';

const controller = new ExampleController();

describe('simple test', () => {
  it('it should return 0.0.1', (done) => {
    const one = '0.0.1';
    expect(one).to.equal('0.0.1');
    done();
  });

  it('/GET version should return correct version', async () => {
    const expected = 'exampleController';
    const result = await controller.get(null, {json: (res) => res} as any, null);
    expect(result).to.haveOwnProperty('result').to.equal(expected);
    return new Promise((resolve) => resolve());
  })
});
