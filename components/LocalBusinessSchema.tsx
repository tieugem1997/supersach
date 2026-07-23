export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LaundryOrDryCleaning',
    name: 'Giặt Sấy SUPER SẠCH',
    alternateName: 'Super Sạch Laundry',
    description:
      'Tiệm giặt sấy chuyên nghiệp tại Quận 2, TP.HCM. Dịch vụ giặt sấy, giặt hấp cao cấp, vệ sinh giày, giao nhận tận nơi.',
    url: 'https://supersach.vn',
    telephone: '+84357358582',
    email: 'supersach.q2@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '105 Đường 39, Phường Bình Trưng',
      addressLocality: 'Quận 2',
      addressRegion: 'TP. Hồ Chí Minh',
      postalCode: '700000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.7838223,
      longitude: 106.7679222,
    },
    hasMap:
      'https://www.google.com/maps/place/Gi%E1%BA%B7t+s%E1%BA%A5y+SUPER+S%E1%BA%A0CH+-+Ti%E1%BB%87m+gi%E1%BA%B7t+s%E1%BA%A5y+-+V%E1%BB%87+sinh+gi%C3%A0y+Super+S%E1%BA%A1ch+-+Gi%E1%BA%B7t+h%E1%BA%A5p+-+Qu%E1%BA%ADn+2+-+Giao+nh%E1%BA%ADn+t%E1%BA%ADn+n%C6%A1i/@10.7750185,106.7588497,15z/data=!4m6!3m5!1s0x317525004b7e883b:0x46d56d7dd3913cc0!8m2!3d10.7838223!4d106.7679222!16s%2Fg%2F11vww07972?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
        ],
        opens: '07:00',
        closes: '21:30',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Bank Transfer',
    areaServed: [
      { '@type': 'City', name: 'Quận 2, TP.HCM' },
      { '@type': 'City', name: 'Quận 9, TP.HCM' },
      { '@type': 'City', name: 'TP. Thủ Đức' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
    },
    sameAs: [
      'https://zalo.me/0357358582',
      'https://www.google.com/maps/place/Gi%E1%BA%B7t+s%E1%BA%A5y+SUPER+S%E1%BA%A0CH+-+Ti%E1%BB%87m+gi%E1%BA%B7t+s%E1%BA%A5y+-+V%E1%BB%87+sinh+gi%C3%A0y+Super+S%E1%BA%A1ch+-+Gi%E1%BA%B7t+h%E1%BA%A5p+-+Qu%E1%BA%ADn+2+-+Giao+nh%E1%BA%ADn+t%E1%BA%ADn+n%C6%A1i/@10.7750185,106.7588497,15z/data=!4m6!3m5!1s0x317525004b7e883b:0x46d56d7dd3913cc0!8m2!3d10.7838223!4d106.7679222!16s%2Fg%2F11vww07972?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
