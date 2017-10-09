/*
 * se-runner-browserstack-example
 * https://github.com/Hyddan/se-runner-browserstack-example
 *
 * Copyright (c) 2017 Daniel Hedenius
 * Licensed under the WTFPL-2.0 license.
 */

'use strict';

module.exports = function (grunt) {
    var browserStackLocalRunning = false,
            browserStackLocalStartFailures = 0,
            browserStackLocalStartRetries = 5,
            browserStackUser = '[BrowserStackUser]',
            browserStackApiKey = '[BrowserStackApiKey]';
    
    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically

    var capabilitiesExtender = function (c) {
                c.name = 'SeRunner::BrowserStack Example';
                c.project = 'SeRunner.BrowserStack.Example';
                c['browserstack.user'] = browserStackUser;
                c['browserstack.key'] = browserStackApiKey;
                c['browserstack.localIdentifier'] = 'SeRunner';
                c['browserstack.debug'] = true;

                return c;
            },
            desktopCapabilities = require('./config/capabilities.desktop.js').map(capabilitiesExtender),
            mobileCapabilities = require('./config/capabilities.mobile.js').map(capabilitiesExtender),
            limitedMobileCapabilities = require('./config/capabilities.mobile.limited.js').map(capabilitiesExtender);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            default: {
                src: [
                    'Gruntfile.js',
                    'test/**/*.js'
                ]
            }
        },
        shell: {
            browserStackLocal: {
                command: 'BrowserStackLocal --local-identifier SeRunner --key ' + browserStackApiKey + ' --folder ' + require('path').join(process.cwd(), 'server'),
                options: {
                    async: true,
                    stopIfStarted: true,
                    stdout: function (data) {
                        if (/http:\/\/.*\.browserstack\.com/.test(data)) {
                            browserStackLocalRunning = true;
                        }
                    },
                    stderr: function (data) {
                        // jshint unused:false
                        browserStackLocalRunning = false;
                        grunt.fail.fatal('Unable to start BrowserStackLocal tunnel');
                    },
                    callback: function(exitCode, stdOutStr, stdErrStr, done) {
                        browserStackLocalRunning = false;
                        
                        done();
                    },
                    execOptions: {
                        cwd: './server'
                    }
                }
            },
            localWebServer: {
                command: 'node server',
                options: {
                    async: true,
                    execOptions: {
                        cwd: './server'
                    },
                    stdout: function (data) {
                        console.log(data);
                    },
                    stderr: function (data) {
                        console.log(data);
                    },
                    callback: function (exitCode, stdOutStr, stdErrStr, done) {
                        done();
                    }
                }
            },
            seleniumStandalone: {
                command: 'selenium-standalone start',
                options: {
                    async: true,
                    execOptions: {
                        cwd: './node_modules/.bin'
                    },
                    stdout: function (data) {
                        console.log(data);
                    },
                    stderr: function (data) {
                        console.log(data);
                    },
                    callback: function (exitCode, stdOutStr, stdErrStr, done) {
                        done();
                    }
                }
            }
        },
        seRunner: {
            options: {
                concurrency: 1,
                context: {
                    url: 'http://' + browserStackUser + '.browserstack.com/harness.html',
                    timeout: 20000
                },
                dependencies: [
                    require('path').join(process.cwd(), './lib/fast-selenium')
                ],
                framework: 'jasmine',
                logLevel: 'INFO',
                jasmine: {
                    dependencies: [],
                    timeout: 120000
                },
                tests: [
                    'test/**/*.js'
                ]
            },
            all: {
                options: {
                    capabilities: desktopCapabilities.concat(limitedMobileCapabilities).concat(mobileCapabilities)
                }
            },
            desktop: {
                options: {
                    capabilities: desktopCapabilities,
                    tests: [
                        'test/**/desktop/**/*.js'
                    ]
                }
            },
            limitedMobile: {
                options: {
                    capabilities: limitedMobileCapabilities,
                    tests: [
                        'test/**/limited-mobile/**/*.js'
                    ]
                }
            },
            local: {
                options: {
                    capabilities: [
                        {
                            browserName: 'chrome'
                        }
                    ],
                    context: {
                        url: 'http://localhost:9999/harness.html'
                    },
                    driverFactory: {
                        create: function (capabilities) {
                            var webdriverLogging = require('selenium-webdriver/lib/logging'),
                                    loggingPreferences = new webdriverLogging.Preferences();
                            loggingPreferences.setLevel(webdriverLogging.Type.BROWSER, webdriverLogging.Level.DEBUG);
                            return new (require('selenium-webdriver')).Builder()
                                                                        .usingServer(this.selenium.hub)
                                                                        .withCapabilities(capabilities)
                                                                        .setLoggingPrefs(loggingPreferences)
                                                                        .build();
                        }
                    },
                    selenium: {
                        hub: 'http://localhost:4444/wd/hub'
                    },
                    tests: [
                        'test/**/desktop/**/*.js'
                    ]
                }
            },
            mobile: {
                options: {
                    capabilities: mobileCapabilities,
                    tests: [
                        'test/**/mobile/**/*.js'
                    ]
                }
            }
        }
    });
    
    grunt.registerTask('waitForBrowserStackLocal', function () {
        var done = this.async(),
                wait = function (counter) {
                    if (!browserStackLocalRunning && 20 > counter) {
                        setTimeout(function () {
                            wait(++counter);
                        }, 500);
                        
                        return;
                    }
                    
                    if (!browserStackLocalRunning) {
                        if (browserStackLocalStartRetries > ++browserStackLocalStartFailures) {
                            setTimeout(function () {
                                grunt.task.run('startBrowserStackLocal');

                                done();
                            }, 500);

                            return;
                        }

                        grunt.fail.fatal('Unable to start BrowserStackLocal tunnel');
                        
                        return;
                    }
                    
                    done();
                };

        if (!browserStackLocalRunning) {
            wait(0);

            return;
        }

        done();
    });

    grunt.registerTask('startBrowserStackLocal', ['shell:browserStackLocal', 'waitForBrowserStackLocal']);

    grunt.registerTask('test.local', ['jshint', 'shell:seleniumStandalone', 'shell:localWebServer', 'seRunner:local']);
    grunt.registerTask('test.all', ['jshint', 'startBrowserStackLocal', 'seRunner:desktop', 'seRunner:limitedMobile', 'seRunner:mobile']);
    grunt.registerTask('default', ['test.all']);
};