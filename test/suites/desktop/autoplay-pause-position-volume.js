module.exports = function (context) {
    describe('Autoplay-pause-position-volume on desktop', function () {
        beforeAll(require('../../spec-components/setup/async-wait-for-document-ready')(context));

        require('../../specs/common/it-should-have-loaded')(context);
        require('../../specs/common/it-should-have-played')(context);
        require('../../specs/common/it-should-have-gotten-duration')(context);

        require('../../specs/common/when-setting-position')(context);
        require('../../specs/common/when-setting-volume')(context);
        require('../../specs/common/when-pausing')(context);

        afterAll(require('../../spec-components/teardown/context-done')(context));
    });
};