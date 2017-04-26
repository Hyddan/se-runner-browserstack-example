module.exports = function (context) {
    return function (done) {
        context.driver.wait(function () {
            return context.driver.executeScript('return window.Result.didStartLoad;');
        }, context.timeout)
            .then(function (result) {
                expect(result).toBe(true);
            })
            .thenCatch(done.fail)
            .thenFinally(done);
    };
};