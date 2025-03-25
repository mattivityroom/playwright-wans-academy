export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = this.page.locator('#user-name');
    this.password = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.navigate();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('load');
    await this.page.context().storageState({ path: 'playwright/.auth/session.json' });
  }
}