const GA_TRACKING_ID = 'UA-122811267-1'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

module.exports = {
  GA_TRACKING_ID,
  pageview,
  event,
}
