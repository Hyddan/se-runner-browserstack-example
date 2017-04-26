module.exports = function (context, next) {
	describe('When pausing', function () {
		beforeAll(require('../../spec-components/setup/async-call-pause')(context));

		it('Should have paused', require('../../spec-components/facts/async-should-have-paused')(context));

		next && next(context);
	});
};