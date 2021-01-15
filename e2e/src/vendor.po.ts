import {browser, by, element} from 'protractor';
export class VendorPage {
  navigateToVendor = () => browser.get('/vendor');

  selectLastVenodor = () => element.all(by.css('.mat-list-item-content')).last();

  venndorAddIcon = () => element(by.id('addvendor'));
  loadName = () => element(by.id('name')).sendKeys('test');
  loadAddress = () => element(by.id('address1')).sendKeys('test');
  loadCity = () => element(by.id('city')).sendKeys('test');
  loadProvince = () => element(by.id('province')).sendKeys('ON');
  loadPostalcode = () => element(by.id('postalcode')).sendKeys('N5Y 3H8');
  loadPhone = () => element(by.id('phone')).sendKeys('(333)333-3333');
  loadType = () => element(by.id('type')).sendKeys('test');
  loadEmail = () => element(by.id('email')).sendKeys('test@test');
  saveButton = () => element(by.id('save'));
  chkForAdded = () => element(by.cssContainingText('.mat-headline', 'added'));

  deleteButton = () => element(by.id('delete'));
  deleteYesButton = () => element(by.id('deleteYes'));
  chkForDeleted = () => element(by.cssContainingText('.mat-headline', 'deleted'));
}
