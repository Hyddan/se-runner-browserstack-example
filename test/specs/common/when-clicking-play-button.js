module.exports = function (context, next) {
    describe('When clicking poster play button', function () {
        beforeAll(require('../../spec-components/setup/async-click-play-button')(context));

        require('./it-should-have-loaded')(context);
        require('./it-should-have-played')(context);
        require('./it-should-have-gotten-duration')(context);

        next && next(context);
    });
};