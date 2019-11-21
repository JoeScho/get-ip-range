'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');

const ipConverter = require('./index.js');

const successResponsev4 = [
  '192.168.1.128',
  '192.168.1.129',
  '192.168.1.130',
  '192.168.1.131',
  '192.168.1.132',
  '192.168.1.133',
  '192.168.1.134',
  '192.168.1.135'
];

const successResponsev6 = [
  '::ffff:102:304',
  '::ffff:102:305',
  '::ffff:102:306',
  '::ffff:102:307',
]

describe('convert', function () {
  describe('for cidr notation', function () {
    describe('error cases', function () {
      it('should return an error if no value is supplied', function () {
        let err;
        try {
          ipConverter();
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if the value is supplied is null', function () {
        let err;
        try {
          ipConverter(null);
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if the value is supplied is undefined', function () {
        let err;
        try {
          ipConverter(undefined);
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if the IP address supplied is invalid', function () {
        let err;
        try {
          ipConverter('abc');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if the IP address supplied is invalid', function () {
        let err;
        try {
          ipConverter(123);
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if the IP address is not in CIDR notation', function () {
        let err;
        try {
          ipConverter('10.1.128.0');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if the IP address uses numbers which are too high', function () {
        let err;
        try {
          ipConverter('192.168.1.134/256');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });
    });

    describe('success cases', function () {
      it('should return an array of IP addresses within the specified range', function () {
        expect(ipConverter('192.168.1.134/29')).to.deep.equal(successResponsev4);
      });

      it('should support IPv6', function () {
        expect(ipConverter('0:0:0:0:0:ffff:102:304/126')).to.deep.equal(successResponsev6);
      });
    });
  });

  describe('for two IP addresses', function () {
    describe('error cases', function () {
      it('should return an error if one of the IP addresses supplied is invalid', function () {
        let err;
        try {
          ipConverter('abc', '192.168.0.1');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses supplied is invalid', function () {
        let err;
        try {
          ipConverter(123, '192.168.0.1');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses supplied is invalid', function () {
        let err;
        try {
          ipConverter('192.168.0.1', 'abc');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses supplied is invalid', function () {
        let err;
        try {
          ipConverter('192.168.0.1', 123);
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in CIDR notation', function () {
        let err;
        try {
          ipConverter('10.1.128.0/29', '10.1.128.0');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in CIDR notation', function () {
        let err;
        try {
          ipConverter('10.1.128.0', '10.1.128.0/29');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in null', function () {
        let err;
        try {
          ipConverter(null, '10.1.128.0');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });


      it('should return an error if one of the IP addresses is in null', function () {
        let err;
        try {
          ipConverter('10.1.128.0', null);
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in undefined', function () {
        let err;
        try {
          ipConverter(undefined, '10.1.128.0');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one of the IP addresses is in undefined', function () {
        let err;
        try {
          ipConverter('10.1.128.0', undefined);
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one IP address has numbers which are too high', function () {
        let err;
        try {
          ipConverter('192.168.1.134/256', '192.168.1.134');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });

      it('should return an error if one IP address has numbers which are too high', function () {
        let err;
        try {
          ipConverter('192.168.1.134', '192.168.1.134/256');
        } catch (e) {
          err = e;
        }

        expect(err).to.be.an('error');
      });
    });

    describe('success cases', function () {
      it('should return an array of IP addresses within the specified range', function () {
        expect(ipConverter('192.168.1.128', '192.168.1.135')).to.deep.equal(successResponsev4);
      });

      it('should support IPv6', function () {
        expect(ipConverter('::ffff:102:304', '::ffff:102:307')).to.deep.equal(successResponsev6);
      });

      it('should support hyphenated range in IPv4', function () {
        expect(ipConverter('192.168.1.128-192.168.1.135')).to.deep.equal(successResponsev4);
      });

      it('should support hyphenated range in IPv5', function () {
        expect(ipConverter('::ffff:102:304-::ffff:102:307')).to.deep.equal(successResponsev6);
      });
    });
  });
});
