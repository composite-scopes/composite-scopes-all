import { withLayers, withoutLayers, layer, proceed, Layer } from "./contextjs.js";
import notify from './copv2/activeEventTracking.js';

notify('click', 'div', () => { console.log('index.js of composite-scope-all')})
    .uninstall();

import foo from 'stack-es2015-modules';

export { foo as Stack };
