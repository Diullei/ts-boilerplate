# ts-boilerplate [![Build Status](https://travis-ci.org/Diullei/ts-boilerplate.svg?branch=master-browser)](https://travis-ci.org/Diullei/ts-boilerplate) <a href="https://ci.appveyor.com/project/Diullei/ts-boilerplate"><img src="https://ci.appveyor.com/api/projects/status/6kl6wffsbu6ivfpu/branch/master-browser" alt="Build Status: Windows" height="18" /></a>

A boilerplate for building TypeScript applications.

Always I have to create a typescript project I spend some time to create and configure the project's structure. This project is a way that I found to share the code structure that I use in my projects. You are free to contribute and send feedbacks.

There are a lot of project types: using node.js, web projects, using AMD, using express, ... You will found in this repo some of this project types to use as bootstrap.

I hope it's useful for you.

## Getting started

This branch will install a basic project structure to build a simple web application. It not use CommonJS or AMD module and will output the script to a unique file `./dist/main.js`.

> NOTE: If you're looking for another type of project take a look at the other branchs below:
* [Simple TypeScript Node.JS app](https://github.com/Diullei/ts-boilerplate/tree/master-nodejs) - [![Build Status](https://travis-ci.org/Diullei/ts-boilerplate.svg?branch=master-nodejs)](https://travis-ci.org/Diullei/ts-boilerplate) <a href="https://ci.appveyor.com/project/Diullei/ts-boilerplate"><img src="https://ci.appveyor.com/api/projects/status/6kl6wffsbu6ivfpu/branch/master-nodejs" alt="Build Status: Windows" height="18" /></a>

The easiest way to get started is to install Git and clone the repository:

> NOTE: You will need install Node.JS

```bash
# Using Git, fetch only the latest commits.  You won't need the full history
# for your project.
git clone -b master-browser --depth 1 https://github.com/Diullei/ts-boilerplate

# Change the repository name (ts-boilerplate) to your own project name.
```

## Updating dependencies

Third party packages may update independently from this main repo, so it's a good idea to update after fetching.

```bash
# You will need the typescript compiler
npm install -g typescript

# Install global dependencies.
npm install -g grunt-cli bower tsd

# Install NPM dependencies.
npm install

# Install TSD dependencies.
tsd reinstall

# Install bower dependencies.
bower install
```

## Build process

The build process consists of numerous Grunt plugin tasks that work together to optimize your application.

```bash
# To run the build process, run the default Grunt task.
grunt
```

Another grunt commands:

```bash
grunt test
# To build and execute all tests and code style validations

grunt serve
# To build and start the project in a browser

grunt check-code-style
# To check the code style
```

## Documentation

> TODO!

## License

Copyright &copy; 2014 Diullei Gomes ([@diullei](https://github.com/Diullei))
Licensed under the MIT license.
