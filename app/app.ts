import * as app from 'tns-core-modules/application';
import './bundle-config';
import * as frescoModule from 'nativescript-fresco';

app.on(app.launchEvent, () => {
  frescoModule.initialize();
});

app.run({ moduleName: 'app-root/app-root' });
