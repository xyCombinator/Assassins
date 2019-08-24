import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';
import {logging} from 'selenium-webdriver';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to ang-app!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should have two circles', () => {
    const list = element(by.tagName('mat-list'));
    const elements = list.all(by.tagName('mat-list-item'))
    expect(elements.count()).toBe(2);

  });
});
