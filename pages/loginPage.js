const LoginPage = (page) => {
  return {
    async navigate() {
      await page.goto('/');
    },

    async login(username, password) {
      this.navigate()
      await page.fill('#user-name', username);
      await page.fill('#password', password);
      await page.click('#login-button');
      await page.waitForLoadState('load')
      await page.context().storageState({ path: 'playwright/.auth/session.json' });
    }
  }
}

module.exports = { LoginPage };