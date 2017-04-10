module.exports = function (context) {
    var webdriver = require('selenium-webdriver'),
            fail = function (error) {
                expect(error).toBeUndefined();
            };
    
    describe('Given a player that is started by clicking the player that pauses after playing for 2 second', function () {
        beforeAll(function (done) {
            context.driver.get(context.url)
                .then(function () {
                    context.driver.wait(function () {
                        return context.driver.executeScript('return \'complete\' === document.readyState;');
                    }, context.timeout)
                        .then(function () {
                            context.driver.wait(webdriver.until.elementLocated({
                                className: 'play'
                            }), context.timeout)
                                .then(function (element) {
                                    element.click()
                                        .then(done)
                                        .thenCatch(function (e) {
                                            console.log('Error clicking play:');
                                            console.log(e);

                                            done.fail(e);
                                        });
                            });
                    });
                }).thenCatch(function (e) {
                    console.log('Error opening url:');
                    console.log(e);

                    done.fail(e);
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