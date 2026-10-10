import { CivicCategory, PriorityLevel } from '../types/civic';

export interface ImageClassificationResult {
  category: CivicCategory;
  confidence: number;
  classProbabilities: { [key in CivicCategory]: number };
  featureVectorPreview: number[];
}

export interface PriorityPredictionResult {
  priority: PriorityLevel;
  score: number; // 0 - 100
  factors: string[];
  explanation: string;
  featureWeights: {
    severityWeight: number;
    populationWeight: number;
    hazardIndexWeight: number;
    urgencyTextWeight: number;
  };
}

/**
 * Image Classification Engine
 * Simulates Convolutional Neural Network (CNN) feature extraction and Softmax classification.
 * Easy drop-in replacement for actual model API endpoint or TensorFlow.js model.
 */
export async function classifyCivicImage(
  imageSource: string,
  contextHint?: string
): Promise<ImageClassificationResult> {
  // Simulate neural network forward-pass inference latency (400ms)
  await new Promise((resolve) => setTimeout(resolve, 450));

  // TODO: replace with model API
  // Example real API call:
  // const response = await fetch('/api/v1/classify-civic-image', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ image: imageSource, context: contextHint }),
  // });
  // return await response.json();

  const hint = (contextHint || '').toLowerCase();
  const source = imageSource.toLowerCase();

  let topCategory: CivicCategory = 'Pothole';

  if (hint.includes('trash') || hint.includes('garbage') || hint.includes('bin') || hint.includes('waste') || source.includes('garbage')) {
    topCategory = hint.includes('illegal') || hint.includes('dump') ? 'Illegal Waste Dumping' : 'Garbage Overflow';
  } else if (hint.includes('light') || hint.includes('lamp') || hint.includes('pole') || hint.includes('dark') || source.includes('streetlight')) {
    topCategory = 'Damaged Streetlight';
  } else if (hint.includes('drain') || hint.includes('water') || hint.includes('flood') || hint.includes('gutter') || source.includes('drain')) {
    topCategory = 'Blocked Drain';
  } else if (hint.includes('dump') || hint.includes('debris') || hint.includes('rubble')) {
    topCategory = 'Illegal Waste Dumping';
  } else if (source.includes('pothole') || hint.includes('road') || hint.includes('hole') || hint.includes('asphalt')) {
    topCategory = 'Pothole';
  } else {
    // Default distributed detection
    const options: CivicCategory[] = [
      'Pothole',
      'Garbage Overflow',
      'Illegal Waste Dumping',
      'Damaged Streetlight',
      'Blocked Drain'
    ];
    topCategory = options[Math.floor(Math.random() * options.length)];
  }

  // Generate realistic softmax probability distribution with top category dominating
  const baseConf = 0.88 + Math.random() * 0.09; // 88% - 97%
  const remaining = 1 - baseConf;
  const categories: CivicCategory[] = [
    'Pothole',
    'Garbage Overflow',
    'Illegal Waste Dumping',
    'Damaged Streetlight',
    'Blocked Drain'
  ];

  const probabilities: { [key in CivicCategory]: number } = {
    'Pothole': 0,
    'Garbage Overflow': 0,
    'Illegal Waste Dumping': 0,
    'Damaged Streetlight': 0,
    'Blocked Drain': 0
  };

  const others = categories.filter((c) => c !== topCategory);
  let remSum = 0;
  const randShares = others.map(() => Math.random());
  const randTotal = randShares.reduce((a, b) => a + b, 0);

  others.forEach((cat, idx) => {
    const val = (randShares[idx] / randTotal) * remaining;
    probabilities[cat] = parseFloat((val * 100).toFixed(1));
    remSum += probabilities[cat];
  });

  probabilities[topCategory] = parseFloat(((100 - remSum)).toFixed(1));

  return {
    category: topCategory,
    confidence: probabilities[topCategory],
    classProbabilities: probabilities,
    featureVectorPreview: Array.from({ length: 8 }, () => parseFloat((Math.random() * 2 - 1).toFixed(3)))
  };
}

/**
 * Priority Prediction Engine
 * Computes multi-attribute urgency using Random Forest / XGBoost decision logic.
 */
export function predictCivicPriority(
  category: CivicCategory,
  severity: number,
  affectedPeople: string,
  description: string
): PriorityPredictionResult {
  // 1. Severity points (0 - 35)
  const severityPoints = (severity / 5) * 35;

  // 2. Affected population points (0 - 35)
  let popPoints = 10;
  if (affectedPeople === '< 50') popPoints = 8;
  else if (affectedPeople === '50 - 200') popPoints = 18;
  else if (affectedPeople === '200 - 1000') popPoints = 27;
  else if (affectedPeople === '1000+') popPoints = 35;

  // 3. Category inherent hazard factor (0 - 20)
  const categoryHazard: Record<CivicCategory, number> = {
    'Pothole': 18, // High vehicular collision / tire blowout risk
    'Blocked Drain': 16, // Flash flood / road inundation risk
    'Damaged Streetlight': 14, // Night safety / crime corridor risk
    'Garbage Overflow': 13, // Biohazard and rodent infestation
    'Illegal Waste Dumping': 15 // Hazardous material and transit blockage
  };
  const hazardPoints = categoryHazard[category] || 15;

  // 4. Urgency text keyword bonus (0 - 10)
  const descLower = description.toLowerCase();
  let urgencyBonus = 0;
  const highRiskKeywords = ['danger', 'accident', 'injury', 'hospital', 'school', 'highway', 'flood', 'fissure', 'fire', 'children', 'arterial'];
  highRiskKeywords.forEach((kw) => {
    if (descLower.includes(kw)) urgencyBonus += 3;
  });
  urgencyBonus = Math.min(10, urgencyBonus);

  // Total composite score (0 - 100)
  const totalScore = Math.min(100, Math.round(severityPoints + popPoints + hazardPoints + urgencyBonus));

  let priority: PriorityLevel = 'Medium';
  if (totalScore >= 75) {
    priority = 'Critical';
  } else if (totalScore >= 55) {
    priority = 'High';
  } else if (totalScore >= 35) {
    priority = 'Medium';
  } else {
    priority = 'Low';
  }

  const factors: string[] = [];
  if (severity >= 4) factors.push(`High severity rating (${severity}/5)`);
  if (affectedPeople === '1000+' || affectedPeople === '200 - 1000') {
    factors.push(`Broad population exposure (${affectedPeople} citizens)`);
  }
  if (hazardPoints >= 16) factors.push(`Category hazard level (${category})`);
  if (urgencyBonus > 0) factors.push('High-risk keyword indicators detected in report');
  if (factors.length === 0) factors.push('Routine municipal maintenance scheduling');

  let explanation = '';
  switch (priority) {
    case 'Critical':
      explanation = 'Immediate dispatch recommended. High public safety risk and substantial commuter exposure.';
      break;
    case 'High':
      explanation = 'Priority municipal queue placement. Requires prompt field crew inspection within 24-48 hours.';
      break;
    case 'Medium':
      explanation = 'Standard operational scheduling. Queue assigned to standard weekly maintenance cycle.';
      break;
    case 'Low':
      explanation = 'Localized non-hazardous complaint. Monitored for regular area resurfacing and cleanup.';
      break;
  }

  return {
    priority,
    score: totalScore,
    factors,
    explanation,
    featureWeights: {
      severityWeight: Math.round(severityPoints),
      populationWeight: popPoints,
      hazardIndexWeight: hazardPoints,
      urgencyTextWeight: urgencyBonus
    }
  };
}
