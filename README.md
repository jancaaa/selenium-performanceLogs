PerformanceLogs class for retrieving performance logs using Selenim Webdriver.

Developed to get GraphQL requests from the Network tab but can be used to process other performance logs.

Tested and used only with Chrome and Chrome Driver.

Network traffic is not captured by default. Requires adding logging preferences to driver capabilities.

```javascript
var { Builder, Capabilities } = require("selenium-webdriver");
var { Preferences, Type, Level } = require("selenium-webdriver/lib/logging");

var loggingPrefs = new Preferences();
loggingPrefs.setLevel(Type.PERFORMANCE, Level.ALL);

var capabilities = Capabilities.chrome();
capabilities.setLoggingPrefs(loggingPrefs);

var driver = new Builder()
  .forBrowser("chrome")
  .withCapabilities(capabilities)
  .build();
```
