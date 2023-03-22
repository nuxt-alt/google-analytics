import type { MeasurementId } from './runtime/types'
import { addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'
import { defu } from 'defu'

const CONFIG_KEY = 'gAnalytics'

export default defineNuxtModule({
    meta: {
        name,
        version,
        configKey: CONFIG_KEY
    },
    defaults: {
        measurementId: undefined,
        measurementIds: [],
        globalParams: {}
    },
    setup(options, nuxt) {
        const config = (nuxt.options.runtimeConfig.public.gAnalytics = defu(nuxt.options.runtimeConfig.public.gAnalytics, options))
        const resolver = createResolver(import.meta.url)

        nuxt.options.app.head.script = nuxt.options.app.head.script || []
        nuxt.options.app.head.script.push({ src: `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`, async: true })
        nuxt.options.app.head.script.push({
            innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('set', ${JSON.stringify(config.globalParams)});

            ${config.measurementIds.length ? config.measurementIds.map((config: MeasurementId) => {
                if ('page_location' in config) {
                    config.page_location = config.domain! + config.page_location
                }
                return `gtag('config', '${config.id}', ${JSON.stringify(config.params)});
            }`}).join('\r\n') : `gtag('config', '${config.measurementId}')`}
        `
        })

        addImports({ name: 'useGAConsent', as: 'useGAConsent', from: resolver.resolve('runtime/composables') })
        addImports({ name: 'useGAConfig', as: 'useGAConfig', from: resolver.resolve('runtime/composables') })
        addImports({ name: 'useGAEvent', as: 'useGAEvent', from: resolver.resolve('runtime/composables') })
        addImports({ name: 'useGAGet', as: 'useGAGet', from: resolver.resolve('runtime/composables') })
        addImports({ name: 'useGASet', as: 'useGASet', from: resolver.resolve('runtime/composables') })

        nuxt.hook('app:resolve', (app) => {
            app.middleware.push({
                name: 'ga4-middleware',
                path: resolver.resolve('runtime/middleware'),
                global: true,
            });
        })
    }
})
