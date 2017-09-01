'use strict';

const expect = require('chai').expect;

const iPConverter = require('index.js');
const invalidError = 'IP supplied is not valid';

describe('convert', function () {
  describe('for cidr notation', function () {
    describe('error cases', function () {
      it('should return an error if no value is supplied', function () {
        expect(iPConverter()).to.equal(invalidError);
      });

      it('should return an error if the IP address supplied is invalid', function () {
        expect(iPConverter('abc')).to.equal(invalidError);
        expect(iPConverter(123)).to.equal(invalidError);
      });

      it('should return an error if the IP address is not in CIDR notation', function () {
        expect(iPConverter('10.1.128.0')).to.equal(invalidError);
      });

      it('should return an error if the IP address uses numbers which are too high', function () {
        expect(iPConverter('192.168.1.134/256')).to.equal(invalidError);
      });
    });

    describe('success cases', function () {
      it('should return an array of IP addresses within the specified range', function () {
        const expectedResponse = [
          '192.168.1.129',
          '192.168.1.130',
          '192.168.1.131',
          '192.168.1.132',
          '192.168.1.133',
          '192.168.1.134',
        ];

        expect(iPConverter('192.168.1.134/29')).to.deep.equal(expectedResponse);
      });
    });
  });

  describe('for two IP addresses', function () {
    describe('error cases', function () {
      it('should return an error if one of the IP addresses supplied is invalid', function () {
        expect(iPConverter('abc', '192.168.0.1')).to.equal(invalidError);
        expect(iPConverter(123, '192.168.0.1')).to.equal(invalidError);
        expect(iPConverter('192.168.0.1', 'abc')).to.equal(invalidError);
        expect(iPConverter('192.168.0.1', 123)).to.equal(invalidError);
      });

      it('should return an error if one of the IP addresses is in CIDR notation', function () {
        expect(iPConverter('10.1.128.0/29', '10.1.128.0')).to.equal(invalidError);
        expect(iPConverter('10.1.128.0', '10.1.128.0/29')).to.equal(invalidError);
      });

      it('should return an error if one IP address has numbers which are too high', function () {
        expect(iPConverter('192.168.1.134/256', '192.168.1.134')).to.equal(invalidError);
        expect(iPConverter('192.168.1.134', '192.168.1.134/256')).to.equal(invalidError);
      });
    });

    describe('success cases', function () {
      it('should return an array of IP addresses within the specified range', function () {
        const expectedResponse = [
          '192.168.1.129',
          '192.168.1.130',
          '192.168.1.131',
          '192.168.1.132',
          '192.168.1.133',
          '192.168.1.134',
        ];

        expect(iPConverter('192.168.1.129', '192.168.1.134')).to.deep.equal(expectedResponse);
      });
    });
  });
});
