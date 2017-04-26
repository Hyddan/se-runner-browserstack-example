module.exports = function (context, volume) {
    return function (done) {
        context.driver.wait(function () {
            return context.driver.executeScript('return ' + volume + ' <= window.Result.volume;');
        }, context.timeout)
            .then(function (result) {
                expect(result).toBe(true);
            })
            .thenCatch(done.fail)
            .thenFinally(done);
    };
};