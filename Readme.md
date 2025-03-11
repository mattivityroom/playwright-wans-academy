### Pre-requites:
- nvm(node version manager), use node 18.18
- install yarn

### Initial playwright project
```
yarn create playwright
```

### Running test:
```
yarn playwright test
```

### Running test with ui, travel mode:
```
yarn playwright test --ui
```

### Running test in debug
```
yarn playwright test --debug

or

yarn playwright test example.spec.js:12 --debug
```

### Running in headless
```
yarn playwright test --headed
```

### Running last flaky / failed test
```
yarn playwright test --last-failed
```

### Show Report
```
yarn playwright show-report
```

### Updating playwright
```
yarn add --dev @playwright/test@latest
yarn playwright install --with-deps
```