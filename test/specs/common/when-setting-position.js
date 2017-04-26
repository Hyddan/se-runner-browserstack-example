module.exports = function (context, position, next) {
    position = 'number' === typeof (position) ? position : 10;

	describe('When setting position to ' + position, function () {
		beforeAll(require('../../spec-components/setup/async-call-position')(context, position));

		it('Should have a position equal to or greater than ' + position, require('../../spec-components/facts/async-should-have-set-position')(context, position));

		next && next(context);
	});
};