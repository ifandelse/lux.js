# Type Check Harness

Static type validation for `index.d.ts`. Each `.ts` file imports from `lux.js` and exercises a slice of the API to prove the type definitions compile correctly.

Run with:

```bash
npx tsc --noEmit
```

No runtime code, no bundler — just the compiler checking that every type resolves. Think of it as unit tests for the `.d.ts` file.

## Files

| File | What it validates |
|------|-------------------|
| `store.ts` | `Store` constructor, `getState`/`setState`/`replaceState`, `waitFor` handler configs |
| `actions.ts` | `actions` registry, `dispatch`, `customActionCreator`, deprecated methods |
| `mixins.ts` | `mixin()`, `mixin.store`, `mixin.actionCreator`, `mixin.actionListener()`, `reactMixin` |
| `wrapper.ts` | `luxWrapper` HOC with all option shapes (actions, stores, getState, lifecycle hooks) |
| `utils.ts` | `printActions`, `printStoreDepTree` |
