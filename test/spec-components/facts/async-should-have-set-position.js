module.exports = function (context, position) {
    return function (done) {
        context.driver.wait(function () {
            return context.driver.executeScript('return ' + position + ' <= window.Result.position;');
        }, context.timeout)
            .then(function (result) {
                expect(result).toBe(true);
            })
            .thenCatch(done.fail)
            .thenFinally(done);
    };
};