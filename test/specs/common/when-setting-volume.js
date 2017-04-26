module.exports = function (context, volume, next) {
    volume = 'number' === typeof (volume) && 0.5 < volume && 1 >= volume ? volume : 1;

	describe('When setting volume to ' + volume, function () {
		beforeAll(require('../../spec-components/setup/async-call-volume')(context, volume));

		it('Should have a volume greater than 0.5', require('../../spec-components/facts/async-should-have-set-volume')(context, 0.5));

		next && next(context);
	});
};