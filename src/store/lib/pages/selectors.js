import React from 'react'
import locale from 'locale'
import { createSelector } from 'reselect'

export const USER_LANGUAGE_COOKIE_KEY = 'userLanguage'

export const headerSelector = (slug) => createSelector(
  (state) => state.pages.headers.array,
  (headers) => headers.find((h) => h.slug === slug)
)

export const productSelector = (slug) => createSelector(
  (state) => state.pages.products.array,
  (products) => products.find((p) => p.slug === slug)
)

export const constantSelector = createSelector(
  (state) => state.pages.constants.array,
  (constants) => (slug) => {
    let foundConst = constants.find((p) => p.slug === slug)

    return foundConst && foundConst.value || ''
  }
)

export const titleSelector = createSelector(
  (state) => state.pages.titles.array,
  (titles) => (slug) => {
    let foundTitle = titles.find((p) => p.slug === slug)

    return foundTitle && <div id={foundTitle.slug} dangerouslySetInnerHTML={{ __html: foundTitle.value }} /> || ''
  }
)

export const languagesSelector = (/*langSelected*/) => createSelector(
  (/* state */) => [
    { code: 'en', name: 'Eng' },
    { code: 'ru', name: 'Rus' },
    { code: 'cn', name: 'Chn' },
    { code: 'de', name: 'Deu' },
    { code: 'ko', name: 'Kor' },
    { code: 'ja', name: 'Jpn' },
    { code: 'ms', name: 'Msa' },
    { code: 'th', name: 'Tha' },
    { code: 'es', name: 'Spa' },
    { code: 'vi', name: 'Vie' },
    { code: 'ar', name: 'Ara' },
  ]
)

export const userLanguageFromCookies = (header) => createSelector(
  // TODO @ipavlenko: Find cookie parser and reimplement
  (/* state */) => {
    // const cookies = (typeof window === 'undefined')
    //   ? cookie
    //   : document.cookie
    //
    // if (!cookies) {
    //   return null
    // }
    const cookie = header.cookie
      ? header.cookie
        .split('; ')
        .find((source) => (source.indexOf(`${USER_LANGUAGE_COOKIE_KEY}=`) > -1))
      : null
    return cookie
      ? cookie.split(`${USER_LANGUAGE_COOKIE_KEY}=`)[1]
      : null
  }
)

// getSupposedUserLanguage
export const userLanguageFromBrowser = (headers) => createSelector(
  languagesSelector(),
  (defaultLanguages) => {
    const acceptLanguage = headers && headers['accept-language']
    const userLocales = new locale.Locales(acceptLanguage)
    const supportedLocales = new locale.Locales(defaultLanguages.map((l) => l.code))
    const bestLocale = userLocales.best(supportedLocales)
    return bestLocale
      ? bestLocale.language
      : null
  }
)
