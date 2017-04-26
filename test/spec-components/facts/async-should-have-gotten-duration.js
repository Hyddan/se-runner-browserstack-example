module.exports = function (context) {
    return function (done) {
        context.driver.wait(function () {
            return context.driver.executeScript('return 0 < window.Result.position;');
        }, context.timeout)
            .then(function () {
                context.driver.executeScript('return window.Result.duration;')
                    .then(function (result) {
                        expect(0 < result).toBe(true);
                    })
                    .thenCatch(done.fail);
            })
            .thenCatch(done.fail)
            .thenFinally(done);
    };
};