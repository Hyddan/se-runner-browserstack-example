module.exports = function (context) {
	describe('Autoplay on a limited mobile', function () {
		beforeAll(require('../../spec-components/setup/async-wait-for-document-ready')(context));

		require('../common/it-should-have-started-loading')(context);

		afterAll(require('../../spec-components/teardown/context-done')(context));
	});
};