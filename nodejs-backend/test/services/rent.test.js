const assert = require('assert');
const app = require('../../src/app');

describe('\'rent\' service', () => {
  it('registered the service', () => {
    const service = app.service('rent');

    assert.ok(service, 'Registered the service (rent)');
  });
});
