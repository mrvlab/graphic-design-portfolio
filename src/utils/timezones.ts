/**
 * IANA timezone list with city information for display
 * This provides a comprehensive list of timezones with their corresponding cities
 */

export interface TimezoneOption {
  value: string; // IANA timezone identifier
  title: string; // Display name with city
}

const timezoneOptionsUnsorted: TimezoneOption[] = [
  // Africa
  { value: 'Africa/Abidjan', title: 'Abidjan, Ivory Coast (GMT)' },
  { value: 'Africa/Accra', title: 'Accra, Ghana (GMT)' },
  { value: 'Africa/Addis_Ababa', title: 'Addis Ababa, Ethiopia (EAT)' },
  { value: 'Africa/Algiers', title: 'Algiers, Algeria (CET)' },
  { value: 'Africa/Cairo', title: 'Cairo, Egypt (EET)' },
  { value: 'Africa/Casablanca', title: 'Casablanca, Morocco (WET)' },
  { value: 'Africa/Johannesburg', title: 'Johannesburg, South Africa (SAST)' },
  { value: 'Africa/Lagos', title: 'Lagos, Nigeria (WAT)' },
  { value: 'Africa/Nairobi', title: 'Nairobi, Kenya (EAT)' },
  { value: 'Africa/Tunis', title: 'Tunis, Tunisia (CET)' },

  // America - North
  { value: 'America/Anchorage', title: 'Anchorage, USA (AKST)' },
  { value: 'America/Chicago', title: 'Chicago, USA (CST)' },
  { value: 'America/Denver', title: 'Denver, USA (MST)' },
  { value: 'America/Los_Angeles', title: 'Los Angeles, USA (PST)' },
  { value: 'America/New_York', title: 'New York, USA (EST)' },
  { value: 'America/Phoenix', title: 'Phoenix, USA (MST)' },
  { value: 'America/Toronto', title: 'Toronto, Canada (EST)' },
  { value: 'America/Vancouver', title: 'Vancouver, Canada (PST)' },
  { value: 'America/Whitehorse', title: 'Whitehorse, Canada (MST)' },

  // America - Central
  { value: 'America/Mexico_City', title: 'Mexico City, Mexico (CST)' },
  { value: 'America/Cancun', title: 'Cancun, Mexico (EST)' },
  { value: 'America/Guatemala', title: 'Guatemala City, Guatemala (CST)' },
  { value: 'America/Havana', title: 'Havana, Cuba (CST)' },
  { value: 'America/Jamaica', title: 'Kingston, Jamaica (EST)' },
  { value: 'America/Panama', title: 'Panama City, Panama (EST)' },

  // America - South
  {
    value: 'America/Argentina/Buenos_Aires',
    title: 'Buenos Aires, Argentina (ART)',
  },
  { value: 'America/Bogota', title: 'Bogotá, Colombia (COT)' },
  { value: 'America/Caracas', title: 'Caracas, Venezuela (VET)' },
  { value: 'America/Lima', title: 'Lima, Peru (PET)' },
  { value: 'America/Santiago', title: 'Santiago, Chile (CLT)' },
  { value: 'America/Sao_Paulo', title: 'São Paulo, Brazil (BRT)' },

  // Asia - East
  { value: 'Asia/Bangkok', title: 'Bangkok, Thailand (ICT)' },
  { value: 'Asia/Hong_Kong', title: 'Hong Kong (HKT)' },
  { value: 'Asia/Jakarta', title: 'Jakarta, Indonesia (WIB)' },
  { value: 'Asia/Kuala_Lumpur', title: 'Kuala Lumpur, Malaysia (MYT)' },
  { value: 'Asia/Manila', title: 'Manila, Philippines (PHT)' },
  { value: 'Asia/Seoul', title: 'Seoul, South Korea (KST)' },
  { value: 'Asia/Shanghai', title: 'Shanghai, China (CST)' },
  { value: 'Asia/Singapore', title: 'Singapore (SGT)' },
  { value: 'Asia/Taipei', title: 'Taipei, Taiwan (CST)' },
  { value: 'Asia/Tokyo', title: 'Tokyo, Japan (JST)' },

  // Asia - South & Central
  { value: 'Asia/Kolkata', title: 'Mumbai/Delhi, India (IST)' },
  { value: 'Asia/Karachi', title: 'Karachi, Pakistan (PKT)' },
  { value: 'Asia/Dhaka', title: 'Dhaka, Bangladesh (BST)' },
  { value: 'Asia/Kathmandu', title: 'Kathmandu, Nepal (NPT)' },

  // Asia - Middle East
  { value: 'Asia/Dubai', title: 'Dubai, UAE (GST)' },
  { value: 'Asia/Jerusalem', title: 'Jerusalem, Israel (IST)' },
  { value: 'Asia/Kuwait', title: 'Kuwait City, Kuwait (AST)' },
  { value: 'Asia/Riyadh', title: 'Riyadh, Saudi Arabia (AST)' },
  { value: 'Asia/Tehran', title: 'Tehran, Iran (IRST)' },

  // Europe - West
  { value: 'Europe/Dublin', title: 'Dublin, Ireland (GMT/IST)' },
  { value: 'Europe/Lisbon', title: 'Lisbon, Portugal (WET)' },
  { value: 'Europe/London', title: 'London, UK (GMT/BST)' },

  // Europe - Central
  { value: 'Europe/Amsterdam', title: 'Amsterdam, Netherlands (CET)' },
  { value: 'Europe/Berlin', title: 'Berlin, Germany (CET)' },
  { value: 'Europe/Brussels', title: 'Brussels, Belgium (CET)' },
  { value: 'Europe/Copenhagen', title: 'Copenhagen, Denmark (CET)' },
  { value: 'Europe/Madrid', title: 'Madrid, Spain (CET)' },
  { value: 'Europe/Paris', title: 'Paris, France (CET)' },
  { value: 'Europe/Prague', title: 'Prague, Czech Republic (CET)' },
  { value: 'Europe/Rome', title: 'Rome, Italy (CET)' },
  { value: 'Europe/Stockholm', title: 'Stockholm, Sweden (CET)' },
  { value: 'Europe/Vienna', title: 'Vienna, Austria (CET)' },
  { value: 'Europe/Warsaw', title: 'Warsaw, Poland (CET)' },
  { value: 'Europe/Zurich', title: 'Zurich, Switzerland (CET)' },

  // Europe - East
  { value: 'Europe/Athens', title: 'Athens, Greece (EET)' },
  { value: 'Europe/Bucharest', title: 'Bucharest, Romania (EET)' },
  { value: 'Europe/Helsinki', title: 'Helsinki, Finland (EET)' },
  { value: 'Europe/Istanbul', title: 'Istanbul, Turkey (TRT)' },
  { value: 'Europe/Kiev', title: 'Kyiv, Ukraine (EET)' },
  { value: 'Europe/Moscow', title: 'Moscow, Russia (MSK)' },

  // Oceania
  { value: 'Australia/Adelaide', title: 'Adelaide, Australia (ACST)' },
  { value: 'Australia/Brisbane', title: 'Brisbane, Australia (AEST)' },
  { value: 'Australia/Melbourne', title: 'Melbourne, Australia (AEST)' },
  { value: 'Australia/Perth', title: 'Perth, Australia (AWST)' },
  { value: 'Australia/Sydney', title: 'Sydney, Australia (AEST)' },
  { value: 'Pacific/Auckland', title: 'Auckland, New Zealand (NZST)' },
  { value: 'Pacific/Fiji', title: 'Suva, Fiji (FJT)' },
  { value: 'Pacific/Honolulu', title: 'Honolulu, USA (HST)' },
];

// Export sorted alphabetically by city name for easier searching in dropdown
export const timezoneOptions: TimezoneOption[] = [
  ...timezoneOptionsUnsorted,
].sort((a, b) => a.title.localeCompare(b.title));

/**
 * Get city name from timezone value
 */
export const getCityFromTimezone = (timezone: string): string => {
  const option = timezoneOptions.find((tz) => tz.value === timezone);
  if (option) {
    // Extract just the city name (before the comma)
    return option.title.split(',')[0];
  }
  // Fallback: extract city from timezone string (e.g., "Europe/Madrid" -> "Madrid")
  return timezone.split('/').pop()?.replace(/_/g, ' ') || timezone;
};

/**
 * Get full display name from timezone value
 */
export const getDisplayNameFromTimezone = (timezone: string): string => {
  const option = timezoneOptions.find((tz) => tz.value === timezone);
  return option?.title || timezone;
};
