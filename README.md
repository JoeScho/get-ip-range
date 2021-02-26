# get-ip-range
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
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
    <td align="center"><a href="https://github.com/JGAntunes"><img src="https://avatars.githubusercontent.com/u/5799039?v=4?s=100" width="100px;" alt=""/><br /><sub><b>João Antunes</b></sub></a><br /><a href="https://github.com/JoeScho/get-ip-range/commits?author=JGAntunes" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ch-t"><img src="https://avatars.githubusercontent.com/u/26768691?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chingiz Toimbetov</b></sub></a><br /><a href="https://github.com/JoeScho/get-ip-range/commits?author=ch-t" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/yaniv-checkmarx"><img src="https://avatars.githubusercontent.com/u/59412524?v=4?s=100" width="100px;" alt=""/><br /><sub><b>yaniv-checkmarx</b></sub></a><br /><a href="https://github.com/JoeScho/get-ip-range/issues?q=author%3Ayaniv-checkmarx" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/stasizon"><img src="https://avatars.githubusercontent.com/u/7525031?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stanislav Sizonenko</b></sub></a><br /><a href="https://github.com/JoeScho/get-ip-range/issues?q=author%3Astasizon" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
