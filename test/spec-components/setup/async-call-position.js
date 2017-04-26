module.exports = function (context, position) {
    return function (done) {
        context.driver.executeScript('window.callAfterPlayable(function () { this.currentTime = ' + position + '; });')
            .then(done)
            .thenCatch(done.fail);
    };
};