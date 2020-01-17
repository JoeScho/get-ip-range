const ip = require('ip');
const ipAddress = require('ip-address')
const { cidrv4, cidrv6 } = require('cidr-regex');

const errorMessage = new Error('IP supplied is not valid');

const getRangev4 = (ip1, ip2) => {
  const ips = [];

  let firstAddressLong = ip.toLong(ip1);
  const lastAddressLong = ip.toLong(ip2);

  for (firstAddressLong; firstAddressLong <= lastAddressLong; firstAddressLong++)
    ips.push(ip.fromLong(firstAddressLong));

  return ips;
}

const getRangev6 = (ip1, ip2) => {
  const ips = [];

  const firstAddress = new ipAddress.Address6(ip1);
  const lastAddress = new ipAddress.Address6(ip2);

  for (let i = firstAddress.bigInteger(); i <= lastAddress.bigInteger(); i++) {
    ips.push(ipAddress.Address6.fromBigInteger(i).correctForm());
  }

  return ips;
}

const isCIDR = ip => {
  return ip.indexOf('/') !== -1
}

const isRange = ip => {
  return ip.indexOf('-') !== -1
}

const convert = (cidrIp, ip2) => {
  const ip1v4 = new ipAddress.Address4(cidrIp);
  const ip1v6 = new ipAddress.Address6(cidrIp);

  if (ip2) {
    const ip2v4 = new ipAddress.Address4(ip2);
    const ip2v6 = new ipAddress.Address6(ip2);

    if (ip1v4.valid && ip2v4.valid && !isCIDR(cidrIp) && !isCIDR(ip2)) {
      return getRangev4(cidrIp, ip2);
    }

    if (ip1v6.valid && ip2v6.valid) {
      return getRangev6(cidrIp, ip2);
    }
  } else {
    if (ip1v4.valid) {
      const subnet = ip.cidrSubnet(cidrIp);

      const firstAddress = subnet.firstAddress;
      const lastAddress = subnet.lastAddress;

      return getRangev4(firstAddress, lastAddress);
    }

    if (ip1v6.valid) {
      const IPv6 = new ipAddress.Address6(cidrIp);
      return getRangev6(IPv6.startAddress().correctForm(), IPv6.endAddress().correctForm());
    }

    if (isRange(cidrIp)) {
      const [ firstAddress, lastAddress ] = cidrIp.split('-');
      return convert(firstAddress, lastAddress);
    }
  }

  throw errorMessage;
}

module.exports = convert;
