import locale from 'locale'
import { createSelector } from 'reselect'

export const USER_LANGUAGE_COOKIE_KEY = 'userLanguage'
export const USER_LANGUAGE_DEFAULT = 'en'
export const STORAGE_TELEGRAM_PIN = 'telegramPin'
export const STORAGE_COOKIES_BAR = 'cookiesBar'

export const headerSelector = (slug) => createSelector(
  (state) => state.pages.headers.array,
  (headers) => headers.find((h) => h.slug === slug)
)

export const productSelector = (slug) => createSelector(
  (state) => state.pages.products.array,
  (products) => products.find((p) => p.slug === slug)
)

export const menuSelector = createSelector(
  (state) => state.pages.menus.array,
  (menus) => (name) => menus.find((p) => p.name === name)
)

export const constantSelector = createSelector(
  (state) => state.pages.constants.array,
  (constants) => (slug) => {
    let foundConst = constants.find((p) => p.slug === slug)

    return foundConst && foundConst.value || ''
  }
)

export const telegramUrlSelector = createSelector(
  (state) => state.pages.socials.array,
  (socials) => (name) => {
    let foundTelegram = socials.find((s) => s.title === name)

    return foundTelegram && foundTelegram.url || ''
  }
)

export const titleSelector = createSelector(
  (state) => state.pages.titles.array,
  (titles) => (slug) => titles.find((p) => p.slug === slug)
)

export const monthsShortSelector = createSelector(
  () => [
    { locale: 'en', monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_') },
    { locale: 'ru', monthsShort: 'Янв_Фев_Март_Апр_Май_Июнь_Июль_Авг_Сен_Окт_Ноя_Дек'.split('_') },
    { locale: 'cn', monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_') },
    { locale: 'de', monthsShort: 'Jan_Feb_März_Apr_Mai_Juni_Juli_Aug_Sep_Okt_Nov_Dez'.split('_') },
    { locale: 'ko', monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_') },
    { locale: 'ms', monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_') },
    { locale: 'th', monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_') },
    { locale: 'es', monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_') },
    { locale: 'vi', monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_') },
  ],
  (locales) => (langCode) => {
    const foundLocale = locales.find((l) => l.locale === langCode)
    return foundLocale && foundLocale.monthsShort || null
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

export const getLanguageByKey = (languageKey) => createSelector(
  (state) => state.pages.languages.array,
  (languages) => languages.find((lang) => lang.key === languageKey)
)

export const getFirstLanguage = createSelector(
  (state) => state.pages.languages.array,
  (languages) => languages && languages[0] && languages[0].key
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

export const getValueLocalStorage = (key) => createSelector(
  (localStorage) => localStorage,
  (l) => l && l.getItem(key)
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
