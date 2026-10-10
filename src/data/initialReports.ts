import { CivicReport } from '../types/civic';

export const INITIAL_REPORTS: CivicReport[] = [
  {
    id: 'CR-2026-1082',
    title: 'Severe Arterial Road Pothole',
    category: 'Pothole',
    description: 'Deep asphalt fissure on 4th Avenue near intersection. Causing sharp vehicle swerving and tire damage during peak morning rush.',
    severity: 5,
    affectedPeople: '1000+',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '420 4th Ave, Central Corridor, Ward 3',
      accuracy: 6,
      ward: 'Ward 3 - Central'
    },
    imageUrl: '/src/assets/images/civic_pothole_road_1791562659993.jpg',
    priority: 'Critical',
    confidence: 96.4,
    status: 'Dispatched',
    timestamp: '2026-10-08T08:14:00Z',
    factors: ['High vehicle traffic corridor', 'Severity rating 5/5', '1000+ commuters impacted']
  },
  {
    id: 'CR-2026-1081',
    title: 'Overflowing Commercial Bins',
    category: 'Garbage Overflow',
    description: 'Public municipal dumpster overflowing for 3 days. Bags split on sidewalk attracting rodents near food storefronts.',
    severity: 4,
    affectedPeople: '200 - 1000',
    location: {
      lat: 37.7812,
      lng: -122.4112,
      address: '88 Market St, Downtown District, Ward 1',
      accuracy: 9,
      ward: 'Ward 1 - Downtown'
    },
    imageUrl: '/src/assets/images/civic_garbage_overflow_1791562673310.jpg',
    priority: 'High',
    confidence: 94.1,
    status: 'In Review',
    timestamp: '2026-10-08T10:45:00Z',
    factors: ['Pedestrian density zone', 'Sanitation bio-hazard', 'Uncollected > 48h']
  },
  {
    id: 'CR-2026-1079',
    title: 'Cracked Sidewalk Streetlight',
    category: 'Damaged Streetlight',
    description: 'Lamp fixture housing cracked and dangling over pedestrian walkway. Dark intersection creating blind spots at night.',
    severity: 4,
    affectedPeople: '200 - 1000',
    location: {
      lat: 37.7695,
      lng: -122.4467,
      address: '512 Haight Blvd, Westside, Ward 5',
      accuracy: 12,
      ward: 'Ward 5 - Westside'
    },
    imageUrl: '/src/assets/images/civic_damaged_streetlight_1791562688586.jpg',
    priority: 'High',
    confidence: 91.8,
    status: 'Pending',
    timestamp: '2026-10-07T19:30:00Z',
    factors: ['Public safety illumination deficit', 'Overhead physical hazard']
  },
  {
    id: 'CR-2026-1076',
    title: 'Blocked Stormwater Curb Inlet',
    category: 'Blocked Drain',
    description: 'Heavy leaf litter and silt blocking main catch basin. Water pooling across two lanes after rain showers.',
    severity: 3,
    affectedPeople: '50 - 200',
    location: {
      lat: 37.7588,
      lng: -122.4144,
      address: '1240 Mission Way, South End, Ward 4',
      accuracy: 8,
      ward: 'Ward 4 - South End'
    },
    imageUrl: '/src/assets/images/civic_blocked_drain_1791562701646.jpg',
    priority: 'Medium',
    confidence: 93.2,
    status: 'Resolved',
    timestamp: '2026-10-06T14:20:00Z',
    resolvedAt: '2026-10-07T11:00:00Z',
    factors: ['Localized street flooding risk', 'Rain forecast imminent']
  },
  {
    id: 'CR-2026-1074',
    title: 'Illegal Drywall & Construction Dumping',
    category: 'Illegal Waste Dumping',
    description: 'Unpermitted contractor dumped plaster boards, buckets, and concrete rubble along service alleyway.',
    severity: 4,
    affectedPeople: '50 - 200',
    location: {
      lat: 37.7654,
      lng: -122.3980,
      address: '300 Illinois Way, Industrial Basin, Ward 2',
      accuracy: 14,
      ward: 'Ward 2 - Industrial'
    },
    imageUrl: '/src/assets/images/civic_garbage_overflow_1791562673310.jpg',
    priority: 'High',
    confidence: 89.5,
    status: 'In Review',
    timestamp: '2026-10-05T16:10:00Z',
    factors: ['Hazardous debris obstruction', 'Unauthorized commercial waste']
  },
  {
    id: 'CR-2026-1070',
    title: 'Minor Residential Asphalt Pothole',
    category: 'Pothole',
    description: 'Small depression formed near driveway cul-de-sac. Slow residential street traffic.',
    severity: 2,
    affectedPeople: '< 50',
    location: {
      lat: 37.7420,
      lng: -122.4350,
      address: '89 Maple Court, Highland Park, Ward 6',
      accuracy: 5,
      ward: 'Ward 6 - Highland'
    },
    imageUrl: '/src/assets/images/civic_pothole_road_1791562659993.jpg',
    priority: 'Low',
    confidence: 95.0,
    status: 'Pending',
    timestamp: '2026-10-05T09:00:00Z',
    factors: ['Low speed residential zone', '< 50 daily vehicles']
  },
  {
    id: 'CR-2026-1065',
    title: 'Transit Depot Storm Drain Clog',
    category: 'Blocked Drain',
    description: 'Main runoff grate completely obstructed by trash bottles and sediment, backing up into passenger bus loading bay.',
    severity: 5,
    affectedPeople: '1000+',
    location: {
      lat: 37.7880,
      lng: -122.4000,
      address: '200 Transit Plaza, Downtown, Ward 1',
      accuracy: 7,
      ward: 'Ward 1 - Downtown'
    },
    imageUrl: '/src/assets/images/civic_blocked_drain_1791562701646.jpg',
    priority: 'Critical',
    confidence: 97.2,
    status: 'Dispatched',
    timestamp: '2026-10-04T11:22:00Z',
    factors: ['Mass transit accessibility', 'Severity 5/5', '1000+ passengers']
  },
  {
    id: 'CR-2026-1061',
    title: 'Flickering Solar Streetlight Pole',
    category: 'Damaged Streetlight',
    description: 'Solar light fixture flickering intermittently and shutting off completely by 11 PM.',
    severity: 2,
    affectedPeople: '50 - 200',
    location: {
      lat: 37.7610,
      lng: -122.4280,
      address: '77 Valley Terrace, South End, Ward 4',
      accuracy: 10,
      ward: 'Ward 4 - South End'
    },
    imageUrl: '/src/assets/images/civic_damaged_streetlight_1791562688586.jpg',
    priority: 'Low',
    confidence: 88.9,
    status: 'Resolved',
    timestamp: '2026-10-03T21:40:00Z',
    resolvedAt: '2026-10-04T15:00:00Z',
    factors: ['Minor electrical defect', 'Secondary residential route']
  }
];

const STORAGE_KEY = 'fixmystreets_reports_db_v1';
const LEGACY_STORAGE_KEY = 'civicpulse_reports_db_v1';

export function getStoredReports(): CivicReport[] {
  if (typeof window === 'undefined') return INITIAL_REPORTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
      return INITIAL_REPORTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading localStorage reports:', err);
    return INITIAL_REPORTS;
  }
}

export function saveStoredReports(reports: CivicReport[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error('Failed writing localStorage reports:', err);
  }
}
