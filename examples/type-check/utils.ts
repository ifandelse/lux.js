import lux, { LuxUtils } from "lux.js";

// -- printActions --
lux.utils.printActions();

// -- printStoreDepTree with no args --
lux.utils.printStoreDepTree();

// -- printStoreDepTree with string arg --
lux.utils.printStoreDepTree("doSomething");

// -- printStoreDepTree with array arg --
lux.utils.printStoreDepTree(["doSomething", "doOther"]);

// -- LuxUtils interface --
const utils: LuxUtils = lux.utils;
utils.printActions();
utils.printStoreDepTree();
