# getIPRange

![Build Status](https://travis-ci.org/JoeScho/getIPRange.png?branch=master)[![Coverage Status](https://coveralls.io/repos/github/JoeScho/getIPRange/badge.svg?branch=master)](https://coveralls.io/github/JoeScho/getIPRange?branch=master)[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://github.com/JoeScho/getIPRange/blob/master/LICENSE)

### Installation

`npm install --save get-ip-range`

### Usage

**For CIDR notation**:

```
const getIPRange = require('get-ip-range');

getIPRange('192.168.1.134/29');
// Returns an array of 6 IP addresses
```

**For two IP addresses**:

```
const getIPRange = require('get-ip-range');

getIPRange('192.168.1.129', '192.168.1.134');
// Returns an array of 6 IP addresses
```
