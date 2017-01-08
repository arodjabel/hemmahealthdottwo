'use strict';

describe('public site tests', function () {

  describe('test major routes', function () {
    it('should reroute to /home when base url is accessed', function () {
      browser.get('http://hemmahealth.com');
      expect(browser.getLocationAbsUrl())
          .toBe('/home');
    });

    it('should go to /services', function () {
      browser.get('http://hemmahealth.com');
      browser.setLocation('services');
      expect(browser.getLocationAbsUrl())
          .toBe('/services');
    });

    it('should go to /resources', function () {
      browser.get('http://hemmahealth.com');
      browser.setLocation('resources');
      expect(browser.getLocationAbsUrl())
          .toBe('/resources');
    });

    it('should go to /contact-us', function () {
      browser.get('http://hemmahealth.com');
      browser.setLocation('contact-us');
      expect(browser.getLocationAbsUrl())
          .toBe('/contact-us');
    });

    it('should go to /about-us', function () {
      browser.get('http://hemmahealth.com');
      browser.setLocation('about-us');
      expect(browser.getLocationAbsUrl())
          .toBe('/about-us');
    });

    it('should go to /lob-reports', function () {
      browser.get('http://hemmahealth.com');
      browser.setLocation('lob-reports');
      expect(browser.getLocationAbsUrl())
          .toBe('/lob-reports');
    });

  });
});
