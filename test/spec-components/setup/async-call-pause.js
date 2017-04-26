module.exports = function (context) {
    return function (done) {
        context.driver.executeScript('window.callAfterPlayable(function () { this.pause(); });')
            .then(done)
            .thenCatch(done.fail);
    };
};