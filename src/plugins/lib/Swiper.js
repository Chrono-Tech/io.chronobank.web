const isBrowser = typeof window === 'object' &&
  typeof document === 'object' &&
  typeof navigator === 'object'

class SwiperStub {
}

export default (() => {
  if (isBrowser) return require('swiper')
  return SwiperStub
})()
