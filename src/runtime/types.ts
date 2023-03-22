import * as NuxtSchema from '@nuxt/schema';

export interface MeasurementId {
    id: string
    params?: Record<string, any>
    domain?: string
}

export interface ConsentParams {
    ad_storage?: 'granted' | 'denied'
    analytics_storage?: 'granted' | 'denied'
    wait_for_update?: number
}

export interface ModuleOptions {
    measurementId: string
    measurementIds?: MeasurementId[]
    globalParams?: Record<string, any>
}

declare module '@nuxt/schema' {
    interface NuxtConfig {
        gAnalytics?: ModuleOptions
    }
    interface NuxtOptions {
        gAnalytics?: ModuleOptions
    }
    interface PublicRuntimeConfig {
        gAnalytics: ModuleOptions
    }
}

declare const gAnalytics: NuxtSchema.NuxtModule<ModuleOptions>

export default gAnalytics