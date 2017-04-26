module.exports = function (context) {
    return function (done) {
        context.driver.get(context.url)
            .then(function () {
                context.driver.wait(function () {
                    return context.driver.executeScript('return \'complete\' === document.readyState;');
                }, context.timeout)
                    .then(done)
                    .thenCatch(function (e) {
                        console.log('Document readyState didn\'t reach \'complete\' in time:');
                        console.log(e);

                        done.fail();
                    });
            })
            .thenCatch(function (e) {
                console.log('Error opening url:');
                console.log(e);

                done.fail();
            });
    };
};