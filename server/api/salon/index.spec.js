'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var salonCtrlStub = {
  index: 'salonCtrl.index',
  show: 'salonCtrl.show',
  create: 'salonCtrl.create',
  update: 'salonCtrl.update',
  destroy: 'salonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var salonIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './salon.controller': salonCtrlStub
});

describe('Salon API Router:', function() {

  it('should return an express router instance', function() {
    expect(salonIndex).to.equal(routerStub);
  });

  describe('GET /api/salons', function() {

    it('should route to salon.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'salonCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/salons/:id', function() {

    it('should route to salon.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'salonCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/salons', function() {

    it('should route to salon.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'salonCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/salons/:id', function() {

    it('should route to salon.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'salonCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/salons/:id', function() {

    it('should route to salon.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'salonCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/salons/:id', function() {

    it('should route to salon.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'salonCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
