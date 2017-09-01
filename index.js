'use strict';

const ip = require('ip');

const errorMessage = 'IP supplied is not valid';

module.exports = convert;

function convert(cidrIp, ip2) {
  /*
  If second IP address is supplied, ensure that both are IPv4 format
  */
  if (ip2) {
    if (ip.isV4Format(cidrIp) && ip.isV4Format(ip2)) {
      return getRange(cidrIp, ip2);
    }

    return errorMessage;
  }

  /*
  Ensure IP is valid and in CIDR format
  */
  if (typeof cidrIp !== 'string' ||
    !ip.isV4Format(cidrIp.split('/')[0]) ||
    !cidrIp.split('/')[1] ||
    cidrIp.split('/')[1] > 255)
    return errorMessage;

  const subnet = ip.cidrSubnet(cidrIp);
  const firstAddress = subnet.firstAddress;
  const lastAddress = subnet.lastAddress;

  return getRange(firstAddress, lastAddress);
}

function getRange(ip1, ip2) {
  const ips = [];

  let firstAddressLong = ip.toLong(ip1);
  const lastAddressLong = ip.toLong(ip2);

  for (firstAddressLong; firstAddressLong <= lastAddressLong; firstAddressLong++) {
    ips.push(ip.fromLong(firstAddressLong));
  }

  return ips;
}
