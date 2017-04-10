module.exports = function (context) {
    var fail = function (error) {
        expect(error).toBeUndefined();
    };
    
    describe('Given a player', function () {
        beforeAll(function (done) {
            context.driver.get(context.url)
                .then(done).thenCatch(function (e) {
                    console.log('Error opening url:');
                    console.log(e);
                });
        });

        it('Should have rendered the player element', function (done) {
            context.driver.wait(function () {
                return context.driver.executeScript('return document.querySelector(\'video#player\').id;');
            }, context.timeout)
                .then(function (result) {
                    expect(result).toBe('player');
                })
                .thenCatch(fail)
                .thenFinally(done);
        });

        afterAll(function () {
            context.done();
        });
    });
};