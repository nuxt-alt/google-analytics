import type { ConsentParams } from './types'
import { useRuntimeConfig } from '#imports'

export function useGAEvent(action: string, params: Record<string, any> = {}) {
    if (!process.client) return
    window.gtag('event', action, params)
}

export function useGAConfig(params: Record<string, any> = {}, id?: string) {
    if (!process.client) return
    const config = useRuntimeConfig().public.gAnalytics
    const tagId = id || config.measurementId

    if ('page_location' in params) {
        params.page_location = location.origin + params.page_location
    }

    window.gtag('config', tagId, params)
}

export function useGAGet(target: string, field: 'client_id' | 'session_id' | 'gclid', callback: Function) {
    if (!process.client) return
    window.gtag('get', target, field, callback())
}

export function useGASet(params: Record<string, any> = {}) {
    if (!process.client) return
    window.gtag('set', params)
}

export function useGAConsent(arg: 'default' | 'update', params: ConsentParams = {}) {
    if (!process.client) return
    window.gtag('consent', arg, params)
}