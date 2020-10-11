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
* Two IPs `"x.x.x.x", "x.x.x.x"`

### IPv6
* CIDR `"x:x:x:x:x:x:x:x/x"`
* Range `"::x:x:x-::x:x:x"`
* Two IPs `"::x:x:x", "::x:x:x"`

**N.B. Shorthand IPv6 is supported**

----

## Usage
```ts
import { getIPRange } from 'get-ip-range';

const ipv4CIDR = getIPRange('192.168.1.134/29');
const ipv4Range = getIPRange('192.168.1.128-192.168.1.135');
const twoIPv4 = getIPRange('192.168.1.128', '192.168.1.135');

// All return:
[
  '192.168.1.128',
  '192.168.1.129',
  '192.168.1.130',
  '192.168.1.131',
  '192.168.1.132',
  '192.168.1.133',
  '192.168.1.134',
  '192.168.1.135',
]

const ipv6CIDR = getIPRange('0:0:0:0:0:ffff:102:304/126');
const ipv6Range = getIPRange('::ffff:102:304-::ffff:102:307');
const twoIPv6 = getIPRange('::ffff:102:304', '::ffff:102:307');

// All return:
[
  '::ffff:102:304',
  '::ffff:102:305',
  '::ffff:102:306',
  '::ffff:102:307',
]
```

----

**Errors**

If the supplied IP address(es) are invalid, the request will **throw an [error](https://nodejs.org/api/errors.html#errors_class_error)**. Please handle errors appropriately.

----

## Contributors
[//]: contributor-faces

<a href="https://github.com/JoeScho"><img src="https://avatars1.githubusercontent.com/u/12475501?s=460&u=ea1487bb0b85777ae539a986d4254d6964d1c9d7&v=4" title="JoeScho" width="80" height="80"></a>
<a href="https://github.com/Miosame"><img src="https://avatars3.githubusercontent.com/u/8201077?s=400&u=9ad891c29b7e6468cb842d6bea320c2eaeefc9d3&v=4" title="Miosame" width="80" height="80"></a>
<a href="https://github.com/JGAntunes"><img src="https://avatars2.githubusercontent.com/u/5799039?s=400&v=4" title="JGAntunes" width="80" height="80"></a>
<a href="https://github.com/ch-t"><img src="https://avatars0.githubusercontent.com/u/26768691?s=400&u=cf1f62f2ad1ae4d829d6d0cfff9f2b8356730bfd&v=4" title="ch-t" width="80" height="80"></a>

[//]: contributor-faces
