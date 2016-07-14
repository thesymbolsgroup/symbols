'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rewardCtrlStub = {
  index: 'rewardCtrl.index',
  show: 'rewardCtrl.show',
  create: 'rewardCtrl.create',
  update: 'rewardCtrl.update',
  destroy: 'rewardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rewardIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reward.controller': rewardCtrlStub
});

describe('Reward API Router:', function() {

  it('should return an express router instance', function() {
    expect(rewardIndex).to.equal(routerStub);
  });

  describe('GET /api/rewards', function() {

    it('should route to reward.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'rewardCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/rewards/:id', function() {

    it('should route to reward.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'rewardCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/rewards', function() {

    it('should route to reward.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'rewardCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/rewards/:id', function() {

    it('should route to reward.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'rewardCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rewards/:id', function() {

    it('should route to reward.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'rewardCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rewards/:id', function() {

    it('should route to reward.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'rewardCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
