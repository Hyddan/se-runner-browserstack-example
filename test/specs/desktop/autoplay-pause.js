module.exports = function (context) {
    describe('Autoplay-pause on desktop', function () {
        beforeAll(require('../../spec-components/setup/async-wait-for-document-ready')(context));

        require('../common/it-should-have-loaded')(context);
        require('../common/it-should-have-played')(context);
        require('../common/it-should-have-gotten-duration')(context);

        require('../common/when-pausing')(context);

        afterAll(require('../../spec-components/teardown/context-done')(context));
    });
};