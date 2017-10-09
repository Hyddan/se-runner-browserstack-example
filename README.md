# se-runner-browserstack-example

> Ready to run example using [se-runner](https://github.com/Hyddan/se-runner#readme) with [grunt-se-runner](https://github.com/Hyddan/grunt-se-runner#readme) and [se-runner-framework-jasmine](https://github.com/Hyddan/se-runner-framework-jasmine#readme) towards BrowserStack

## Installation
Fork and/or clone, run `npm install` and make changes as needed.

## NPM package
* https://npmjs.com/package/se-runner-browserstack-example

## Overview
#### Gruntfile.js
The grunt file will begin by starting a tunnel to BrowserStack (using the BrowserStackLocal binary) and then start executing the specified tests.

In the beginning of the file there are two placeholders; **[BrowserStackUser]** and **[BrowserStackApiKey]**. There you will have to input your BrowserStack credentials.

#### Config folder
Contains the BrowserStack capabilities configurations, i.e. which browsers & devices to test against.

#### Server folder
The server folder is what is being exposed through BrowserStackLocal. Files in here will be made available in BrowserStack over HTTP (using the address: http://[BrowserStackUser].browserstack.com/).

For instance, this example has a simple test harness (harness.html) which sets up a simple HTML5 video that the tests can check against.

#### Test folder
Holds a few simple sample tests that load up the test harness and checks that a few things occurred.

## Notes
* This example is made to be run on a Windows machine. To use something else you have to download the appropriate BrowserStackLocal binary and place it in the `server/` folder.
* If you don't need to test local files but a page accessible over the internet you can remove the steps that start the BrowserStack tunnel.
* If you need to test an internal page that you don't have locally the tunnel can be set up as a proxy. Check the BrowserStackLocal binary's help section for command syntaxt to do this.

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style.

## Release History

 * 2017-10-09   v1.2.0   Added example for local testing with selenium-standalone.
 * 2017-04-26   v1.1.0   Refactored example tests.
 * 2017-04-10   v1.0.0   Initial version.