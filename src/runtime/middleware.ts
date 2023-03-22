import { defineNuxtRouteMiddleware, useGAConfig } from '#imports';

export default defineNuxtRouteMiddleware(async (to, from) => {
    useGAConfig({ page_location: to.fullPath })
});
