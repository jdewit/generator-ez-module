describe('<%= appname %>', function() {

  var _scope;

  beforeEach(function() {
    module('<%= moduleName %>');

    module(function($provide) {
      //$provide.constant('$modal', window.$modal);
    });
  });

  beforeEach(inject(function($rootScope, $controller) {
    _scope = $rootScope.$new();
  }));

  it('should init', function() {
    assert.isTrue(true);
  });
});

