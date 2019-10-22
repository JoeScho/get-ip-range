# get-ip-range

Simple utility to convert either CIDR notation, a hyphenated IP range, or two IP addresses to an array of the range of IP addresses.

----

<a href="https://nodei.co/npm/get-ip-range/"><img src="https://nodei.co/npm/get-ip-range.png?downloads=true"></a>

![Build Status](https://travis-ci.org/JoeScho/get-ip-range.svg?branch=master)[![Coverage Status](https://coveralls.io/repos/github/JoeScho/getIPRange/badge.svg?branch=master)](https://coveralls.io/github/JoeScho/getIPRange?branch=master)[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://github.com/JoeScho/getIPRange/blob/master/LICENSE)

----

## Installation

```sh
$ npm i get-ip-range
```

----

## Accepted formats
### IPv4
* CIDR `"x.x.x.x/x"`
* Range `"x.x.x.x-x.x.x.x"`
* Two IPs `"x.x.x.x, x.x.x.x"`

### IPv6
* CIDR `"x:x:x:x:x:x:x:x/x"`
* Range `"::x:x:x-::x:x:x"`
* Two IPs `"::x:x:x", "::x:x:x"`

**N.B. Shorthand IPv6 is supported**

----

## Usage
```js
const getIPRange = require('get-ip-range');

const ipv4CIDR = getIPRange('192.168.1.134/29');
const ipv4Range = getIPRange('192.168.1.128-192.168.1.135');
const twoIPv4 = getIPRange('192.168.1.128', '192.168.1.135');

// All return:
//
// [
//   '192.168.1.128',
//   '192.168.1.129',
//   '192.168.1.130',
//   '192.168.1.131',
//   '192.168.1.132',
//   '192.168.1.133',
//   '192.168.1.134',
//   '192.168.1.135',
// ]
//

const ipv6CIDR = getIPRange('0:0:0:0:0:ffff:102:304/126');
const ipv6Range = getIPRange('::ffff:102:304-::ffff:102:307');
const twoIPv6 = getIPRange('::ffff:102:304', '::ffff:102:307');

// All return:
//
// [
//   '::ffff:102:304',
//   '::ffff:102:305',
//   '::ffff:102:306',
//   '::ffff:102:307',
// ]
//
```

----

**Errors**

If the supplied IP address(es) are invalid, the request will **throw an [error](https://nodejs.org/api/errors.html#errors_class_error)**. Please handle errors appropriately.

----
