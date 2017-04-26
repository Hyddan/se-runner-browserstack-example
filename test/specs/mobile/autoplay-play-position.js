module.exports = function (context) {
    describe('Autoplay-play-position-pause on a mobile', function () {
        beforeAll(require('../../spec-components/setup/async-wait-for-document-ready')(context));

        require('../common/when-clicking-play-button')(Object.assign({}, context, {
            timeout: 3 * context.timeout
        }), function (positionContext) {
            require('../common/when-setting-position')(positionContext, null, function (pauseContext) {
                require('../common/when-pausing')(pauseContext);
            });
        });

        afterAll(require('../../spec-components/teardown/context-done')(context));
    });
};