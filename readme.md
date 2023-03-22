> Google Analytics 4 module for [Nuxt](https://nuxt.com)

## Info

This is a Google Analytics 4 module for nuxt. Since Universal Analytics is going away, there will be no compatibility with it. Everything here is meant for GA4.

## Setup

1. Add `@nuxt-alt/google-analytics` dependency to your project

```bash
yarn add @nuxt-alt/google-analytics
```

2. Add `@nuxt-alt/google-analytics` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
    modules: [
        '@nuxt-alt/google-analytics'
    ],
    gAnalytics: {
        /* module options */
    }
});

```

## Options

### `measurementId`

- Type: `String`
- Default: `undefined`
- Required: `true`

The measurement ID for your google analytics tag. You can find this Id by following these steps:

1. Go to Admin in GA4 Dashboard
2. Select the Account you want to use
3. Select Data Streams
4. Create a stream if you haven't already done so. If you have already done so, then click on the stream.
5. The measurement ID will be located on the right in the `Stream details` box. generally the ID will look like: `G-XXXXXXXXXX`

### `measurementIds`

- Type: `Array`
- Default: `[]`
- Required: `false`

This is kind of the same as `measurementId` except that you're going to be using an array of objects. Each Object uses an `id`, `params` and `domain` property. This will generate more config gtags if you end up needing to use more than one measurement Id. Do note that `measurementId` is still required as you need a base id for the gtag. The `domain` property is required if you end up using `page_location` in this setup, though its recommended you don't do this since the middleware already handles setting the `page_location`.

Example:

```ts
export default defineNuxtConfig({
    gAnalytics: {
        measurementId: 'G-XXXXXXXXXX',
        measurementIds: [
            { id: 'G-XXXXXXXXXX', domain: 'https://example.com', params: { page_location: '/' } },
        ]
    }
});

```

### `globalParams`

- Type: `Object`
- Default: `{}`
- Required: `false`

This sets values that persists across all subsequent gtag calls on the page using `gtag('set', { <key>: <value> })`

## Composable

The following composable are available to use (do note, that these only work in the browser):

- `useGAConsent(arg, params)` - `gtag('consent')` equivalent
- `useGAConfig(params, id)` - `gtag('config')` equivalent, `id` is optional if you intend to use the main measurement ID 
- `useGAEvent(action, params)` - `gtag('event')` equivalent
- `useGAGet(target, field, callback)` - `gtag('get')` equivalent
- `useGASet(params)` - `gtag('set')` equivalent

Read more about these functions [here](https://developers.google.com/tag-platform/gtagjs/reference)