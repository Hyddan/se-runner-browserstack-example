module.exports = function (context) {
    var fail = function (error) {
        expect(error).toBeUndefined();
    };
    
    describe('Given a player with autostart that pauses after playing for 2 seconds', function () {
        beforeAll(function (done) {
            context.driver.get(context.url)
                .then(done).thenCatch(function (e) {
                    console.log('Error opening url:');
                    console.log(e);
                });
        });

        it('Should have loaded', function (done) {
            context.driver.wait(function () {
                return context.driver.executeScript('return window.Result.didLoad;');
            }, context.timeout)
                .then(function (result) {
                    expect(result).toBe(true);
                })
                .thenCatch(fail)
                .thenFinally(done);
        });

        it('Should have played', function (done) {
            context.driver.wait(function () {
                return context.driver.executeScript('return window.Result.didPlay;');
            }, context.timeout)
                .then(function (result) {
                    expect(result).toBe(true);
                })
                .thenCatch(fail)
                .thenFinally(done);
        });

        it('Should have paused', function (done) {
            context.driver.wait(function () {
                return context.driver.executeScript('return window.Result.didPause;');
            }, context.timeout)
                .then(function (result) {
                    expect(result).toBe(true);
                })
                .thenCatch(fail)
                .thenFinally(done);
        });

        afterAll(function () {
            context.done();
        });
    });
};