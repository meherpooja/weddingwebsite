export const wedding = {
  partnerOne: "Sid",
  partnerTwo: "Pooja",
  hashtag: "#SidAndPoojaForever",
  dateLabel: "November 25 & 27, 2026",
}

export const venue = {
  name: "Banjara Banquets",
  address: "1656 Buford Hwy, Cumming, GA 30041",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Banjara+Banquets%2C+1656+Buford+Hwy%2C+Cumming%2C+GA+30041",
}

export const nearbyHotels = [
  {
    name: "Holiday Inn Express & Suites Atlanta-Cumming",
    address: "870 Buford Highway, Cumming, GA 30041",
    website: "https://www.ihg.com/holidayinnexpress/hotels/us/en/cumming/atlcu/hoteldetail",
    maps: "https://www.google.com/maps/search/?api=1&query=Holiday+Inn+Express+%26+Suites+Atlanta-Cumming%2C+870+Buford+Highway%2C+Cumming%2C+GA+30041",
  },
  {
    name: "Country Inn & Suites by Radisson",
    address: "915 Buford Highway, Cumming, GA 30041",
    website: "https://www.choicehotels.com/georgia/cumming/country-inn-suites-hotels/gad37",
    maps: "https://www.google.com/maps/search/?api=1&query=Country+Inn+%26+Suites+by+Radisson%2C+915+Buford+Highway%2C+Cumming%2C+GA+30041",
  },
  {
    name: "Comfort Suites Cumming-Atlanta",
    address: "905 Buford Road, Cumming, GA 30041",
    website: "https://www.choicehotels.com/georgia/cumming/comfort-suites-hotels/ga030",
    maps: "https://www.google.com/maps/search/?api=1&query=Comfort+Suites+Cumming-Atlanta%2C+905+Buford+Road%2C+Cumming%2C+GA+30041",
  },
  {
    name: "Hampton Inn Cumming",
    address: "915 Ronald Reagan Boulevard, Cumming, GA 30041",
    website: "https://www.hilton.com/en/hotels/cumgahx-hampton-cumming/",
    maps: "https://www.google.com/maps/search/?api=1&query=Hampton+Inn+Cumming%2C+915+Ronald+Reagan+Boulevard%2C+Cumming%2C+GA+30041",
  },
  {
    name: "Fairfield Inn & Suites Atlanta Cumming/Johns Creek",
    address: "3150 Ronald Reagan Boulevard, Cumming, GA 30041",
    website: "https://www.marriott.com/en-us/hotels/atlng-fairfield-inn-and-suites-atlanta-cumming-johns-creek/overview/",
    maps: "https://www.google.com/maps/search/?api=1&query=Fairfield+Inn+%26+Suites+Atlanta+Cumming%2FJohns+Creek%2C+3150+Ronald+Reagan+Boulevard%2C+Cumming%2C+GA+30041",
  },
] as const

export const events = [
  {
    id: "pre-wedding",
    name: "Pre-wedding celebration",
    dateLabel: "Wednesday, November 25, 2026",
    timeLabel: "07:00 PM",
    venue: venue.name,
  },
  {
    id: "wedding",
    name: "Wedding ceremony",
    dateLabel: "Friday, November 27, 2026",
    timeLabel: "10:30 AM onwards · Muhurtham at 11:57 AM",
    venue: venue.name,
  },
] as const

export const story = [
  {
    year: "2017",
    title: "How we met",
    body: "A rainy Tuesday, a crowded coffee shop, and the last free table. Sid asked to share it, Pooja said yes, and neither of them got much work done that afternoon.",
  },
  {
    year: "2020",
    title: "Our first home",
    body: "We adopted a very opinionated cat, painted the kitchen the wrong shade of green twice, and learned that we make a pretty great team.",
  },
  {
    year: "2025",
    title: "The proposal",
    body: "On a quiet trail overlooking the coast at sunset, Pooja got down on one knee. Sid said yes before the question was finished.",
  },
]

export const gallery = [
  { src: "/images/gallery-1.jpg", alt: "Bridal bouquet of white roses and eucalyptus resting on linen" },
  { src: "/images/gallery-3.jpg", alt: "Vineyard estate venue among rolling green hills at golden hour" },
  { src: "/images/gallery-2.jpg", alt: "Candlelit outdoor reception table set for dinner at dusk" },
  { src: "/images/gallery-4.jpg", alt: "Dried petals catching golden sunlight in a celebratory moment" },
]

export const registry = [
  {
    name: "The Honeymoon Fund",
    body: "We're dreaming of two weeks in Portugal. A contribution toward the trip would mean the world.",
    href: "#",
  },
  {
    name: "Crate & Barrel",
    body: "For the home we're building together, from cookware to cozy linens.",
    href: "#",
  },
  {
    name: "Zola",
    body: "A little bit of everything, all in one convenient place.",
    href: "#",
  },
]
