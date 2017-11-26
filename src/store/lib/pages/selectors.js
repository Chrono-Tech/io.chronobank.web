import { createSelector } from 'reselect'

export const headerSelector = slug => createSelector(
  state => state.pages.headers.array,
  headers => headers.find(h => h.slug === slug)
)

export const productSelector = slug => createSelector(
  state => state.pages.products.array,
  products => products.find(p => p.slug === slug)
)
