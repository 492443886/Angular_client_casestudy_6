import { AppPage } from './app.po';
import { VendorPage } from './vendor.po';
import {browser} from 'protractor';
describe('workspace-project App', () => {
  let page: VendorPage;

  beforeEach(() => {
    page = new VendorPage();
  });

  it('should add a new vendor', async () => {
    await page.navigateToVendor();
    await page.venndorAddIcon().click();
    await page.loadName();
    await page.loadAddress();
    await page.loadCity();
    await page.loadProvince();
    await page.loadEmail();
    await page.loadPhone();
    await page.loadPostalcode();
    await page.loadType();
    await page.saveButton().click();
    browser.sleep(10000);
    return expect(page.chkForAdded().isPresent()).toEqual(true);
  })


  it('should delete the vendor we just added', async () => {
    await page.navigateToVendor();
    await page.selectLastVenodor().click();
    await page.deleteButton().click();
    await page.deleteYesButton().click();
    browser.sleep(10000);
    // browser.pause(); // or sleep but the dialogue seems to need some time to work
    return expect(page.chkForDeleted().isPresent()).toEqual(true);
  });
});
