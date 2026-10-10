export type CivicCategory = 
  | 'Pothole'
  | 'Garbage Overflow'
  | 'Illegal Waste Dumping'
  | 'Damaged Streetlight'
  | 'Blocked Drain';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type ReportStatus = 'Pending' | 'In Review' | 'Dispatched' | 'Resolved';

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  accuracy?: number;
  ward?: string;
}

export interface CivicReport {
  id: string;
  title: string;
  category: CivicCategory;
  description: string;
  severity: number; // 1 to 5
  affectedPeople: '< 50' | '50 - 200' | '200 - 1000' | '1000+';
  location: LocationData;
  imageUrl: string;
  priority: PriorityLevel;
  confidence: number; // 0 to 100%
  status: ReportStatus;
  timestamp: string; // ISO format
  factors?: string[];
  resolvedAt?: string;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  samplesEvaluated: number;
}
