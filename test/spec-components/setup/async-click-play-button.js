module.exports = function (context) {
    var webdriver = require('selenium-webdriver');

    return function (done) {
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
            })
            .thenCatch(done.fail);
    };
};