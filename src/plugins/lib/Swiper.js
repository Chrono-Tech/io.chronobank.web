const isBrowser = typeof window === 'object' &&
  typeof document === 'object' &&
  typeof navigator === 'object'

class SwiperStub {
}

export default (() => {
  // eslint-disable-next-line global-require
  if (isBrowser) return require('swiper')
  return SwiperStub
})()
