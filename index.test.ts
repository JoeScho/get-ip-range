import { getIPRange } from './index';

const successResponsev4 = [
  '192.168.1.129',
  '192.168.1.130',
  '192.168.1.131',
  '192.168.1.132',
  '192.168.1.133',
  '192.168.1.134',
];

const successResponsev6 = [
  '::ffff:102:304',
  '::ffff:102:305',
  '::ffff:102:306',
  '::ffff:102:307',
]

describe('convert', function () {
  describe('for cidr notation', function () {
    it('should return an error if the value is supplied is null', function () {
      const fn = () => getIPRange(null);
      expect(fn).toThrow();
    });

    it('should return an error if the value is supplied is undefined', function () {
      const fn = () => getIPRange(undefined);
      expect(fn).toThrow();
    });

    it('should return an error if the IP address supplied is invalid', function () {
      const fn = () => getIPRange('abc');
      expect(fn).toThrow();
    });

    it('should return an error if the IP address is not in CIDR notation', function () {
      const fn = () => getIPRange('10.1.128.0');
      expect(fn).toThrow();
    });

    it('should return an error if the IP address uses numbers which are too high', function () {
      const fn = () => getIPRange('192.168.1.134/256');
      expect(fn).toThrow();
    });
  });

  describe('success cases', function () {
    it('should return an array of IP addresses within the specified range', function () {
      expect(getIPRange('192.168.1.134/29')).toEqual(successResponsev4);
    });

    it('should support IPv6', function () {
      expect(getIPRange('0:0:0:0:0:ffff:102:304/126')).toEqual(successResponsev6);
    });
  });
});

describe('for two IP addresses', function () {
  describe('error cases', function () {
    it('should return an error if one of the IP addresses supplied is invalid', function () {
      const fn = () => getIPRange('abc', '192.168.0.1');
      expect(fn).toThrow();
    });

    it('should return an error if one of the IP addresses supplied is invalid', function () {
      const fn = () => getIPRange('192.168.0.1', 'abc');
      expect(fn).toThrow();
    });

    it('should return an error if one of the IP addresses is in CIDR notation', function () {
      const fn = () => getIPRange('10.1.128.0/29', '10.1.128.0');
      expect(fn).toThrow();
    });

    it('should return an error if one of the IP addresses is in CIDR notation', function () {
      const fn = () => getIPRange('10.1.128.0', '10.1.128.0/29');
      expect(fn).toThrow();
    });

    it('should return an error if one of the IP addresses is in null', function () {
      const fn = () => getIPRange(null, '10.1.128.0');
      expect(fn).toThrow();
    });


    it('should return an error if one of the IP addresses is in null', function () {
      const fn = () => getIPRange('10.1.128.0', null);
      expect(fn).toThrow();
    });

    it('should return an error if one of the IP addresses is in undefined', function () {
      const fn = () => getIPRange(undefined, '10.1.128.0');
      expect(fn).toThrow();
    });

    it('should return an error if one of the IP addresses is in undefined', function () {
      const fn = () => getIPRange('10.1.128.0', undefined);
      expect(fn).toThrow();
    });

    it('should return an error if one IP address has numbers which are too high', function () {
      const fn = () => getIPRange('192.168.1.134/256', '192.168.1.134');
      expect(fn).toThrow();
    });

    it('should return an error if one IP address has numbers which are too high', function () {
      const fn = () => getIPRange('192.168.1.134', '192.168.1.134/256');
      expect(fn).toThrow();
    });
  });

  describe('success cases', function () {
    it('should return an array of IP addresses within the specified range', function () {
      expect(getIPRange('192.168.1.129', '192.168.1.134')).toEqual(successResponsev4);
    });

    it('should support IPv6', function () {
      expect(getIPRange('::ffff:102:304', '::ffff:102:307')).toEqual(successResponsev6);
    });

    it('should support hyphenated range in IPv4', function () {
      expect(getIPRange('192.168.1.129-192.168.1.134')).toEqual(successResponsev4);
    });

    it('should support hyphenated range in IPv5', function () {
      expect(getIPRange('::ffff:102:304-::ffff:102:307')).toEqual(successResponsev6);
    });
  });
});
