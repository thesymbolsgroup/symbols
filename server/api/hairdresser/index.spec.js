'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var hairdresserCtrlStub = {
  index: 'hairdresserCtrl.index',
  show: 'hairdresserCtrl.show',
  create: 'hairdresserCtrl.create',
  update: 'hairdresserCtrl.update',
  destroy: 'hairdresserCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var hairdresserIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './hairdresser.controller': hairdresserCtrlStub
});

describe('Hairdresser API Router:', function() {

  it('should return an express router instance', function() {
    expect(hairdresserIndex).to.equal(routerStub);
  });

  describe('GET /api/hairdressers', function() {

    it('should route to hairdresser.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'hairdresserCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/hairdressers/:id', function() {

    it('should route to hairdresser.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'hairdresserCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/hairdressers', function() {

    it('should route to hairdresser.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'hairdresserCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/hairdressers/:id', function() {

    it('should route to hairdresser.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'hairdresserCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/hairdressers/:id', function() {

    it('should route to hairdresser.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'hairdresserCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/hairdressers/:id', function() {

    it('should route to hairdresser.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'hairdresserCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
