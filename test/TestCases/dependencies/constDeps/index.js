define("exports,module,./dep".split(","), function(exports, module, dep) {
	it("should compile", function(done) {
		done();
	});

	it("require scoping", function(done) {
		// verify require function hasn't been renamed;
		var name = "req";
		name += "uire";
		eval(name).should.be.eql(require);
		(typeof require.toUrl).should.be.eql("function");
		(typeof require.toAbsMid).should.be.eql("function");
		done();
	});

	it("defined vars" , function(done) {
		exports.should.be.eql(exports);
		module.id.should.be.eql("test/index");
		done();
	});

	it("require", function(done) {
		require('test/dep').should.be.eql(dep);
		var exceptionThrown;
		try {
			require('test/asyncDep');
		} catch(e) {
			exceptionThrown = true;
		}
		exceptionThrown.should.be.true;
		require('require,./asyncDep'.split(','), function(require, asyncDep) {
			asyncDep.should.be.eql("asyncDep");
			// context require
			require("./asyncDep").should.be.eql(asyncDep);
			require('test/asyncDep').should.be.eql(asyncDep);
			done();
		});
	});

	dep.runTests();
});
