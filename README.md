# get-ip-range
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Simple utility to convert either CIDR notation, a hyphenated IP range, or two IP addresses to an array of the range of IP addresses.

----

<a href="https://nodei.co/npm/get-ip-range/"><img src="https://nodei.co/npm/get-ip-range.png?downloads=true"></a>

![Build Status](https://travis-ci.org/JoeScho/get-ip-range.svg?branch=main)[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://github.com/JoeScho/getIPRange/blob/main/LICENSE)

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

* If the supplied IP address(es) are invalid, the request will **throw an [error](https://nodejs.org/api/errors.html#errors_class_error)**. Please handle errors appropriately.
* If there are more than the default maximum range (10000) or the environment variable (MAX_RANGE) IPs in the range, it will throw an error.

----

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/JoeScho"><img src="https://avatars.githubusercontent.com/u/12475501?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joe Schofield</b></sub></a><br /><a href="https://github.com/JoeScho/get-ip-range/commits?author=JoeScho" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Miosame"><img src="https://avatars.githubusercontent.com/u/8201077?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Miosame</b></sub></a><br /><a href="https://github.com/JoeScho/get-ip-range/commits?author=Miosame" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->





<a href="https://github.com/JoeScho"><img src="https://avatars1.githubusercontent.com/u/12475501?s=460&u=ea1487bb0b85777ae539a986d4254d6964d1c9d7&v=4" title="JoeScho" width="80" height="80"></a>
<a href="https://github.com/Miosame"><img src="https://avatars3.githubusercontent.com/u/8201077?s=400&u=9ad891c29b7e6468cb842d6bea320c2eaeefc9d3&v=4" title="Miosame" width="80" height="80"></a>
<a href="https://github.com/JGAntunes"><img src="https://avatars2.githubusercontent.com/u/5799039?s=400&v=4" title="JGAntunes" width="80" height="80"></a>
<a href="https://github.com/ch-t"><img src="https://avatars0.githubusercontent.com/u/26768691?s=400&u=cf1f62f2ad1ae4d829d6d0cfff9f2b8356730bfd&v=4" title="ch-t" width="80" height="80"></a>
<a href="https://github.com/yaniv-checkmarx"><img src="https://avatars.githubusercontent.com/u/59412524?s=400&u=320f70f64c191c52aead4bdbb9245d65d1353a17&v=4" title="yaniv-checkmarx" width="80" height="80"></a>

[//]: contributor-faces
