'use strict';

const ip = require('ip');

module.exports = convert;

function convert (cidrIp) {
  const ips = [];

  if (typeof cidrIp !== 'string' || !ip.isV4Format(cidrIp.split('/')[0]) || !cidrIp.split('/')[1] || cidrIp.split('/')[1] > 255)
    return 'IP supplied is not valid';

  const subnet = ip.cidrSubnet(cidrIp);
  const firstAddress = subnet.firstAddress;
  const lastAddress = subnet.lastAddress;

  let firstAddressLong = ip.toLong(firstAddress);
  const lastAddressLong = ip.toLong(lastAddress);

  for (firstAddressLong; firstAddressLong <= lastAddressLong; firstAddressLong++) {
    ips.push(ip.fromLong(firstAddressLong));
  }

  return ips;
}
