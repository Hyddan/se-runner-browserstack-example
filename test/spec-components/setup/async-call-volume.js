module.exports = function (context, volume) {
    return function (done) {
        context.driver.executeScript('window.callAfterPlayable(function () { this.volume = ' + volume + '; });')
            .then(done)
            .thenCatch(done.fail);
    };
};