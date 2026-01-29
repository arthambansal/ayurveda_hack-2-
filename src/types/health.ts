export type SleepDuration = '< 4 hrs' | '5-6 hrs' | '7-8 hrs' | '> 9 hrs';
export type StressLevel = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Extreme';
export type ActivityLevel = 'Sedentary' | 'Light Active' | 'Active' | 'Athlete';
export type DietQuality = 'Processed/Junk' | 'Mixed' | 'Home Cooked/Fresh';
export type BodyFrame = 'Petite/Thin' | 'Medium/Athletic' | 'Heavy/Broad';
export type SkinType = 'Dry/Rough' | 'Oily/Sensitive' | 'Soft/Moist';

export interface HealthInputs {
  sleep: SleepDuration;
  stress: StressLevel;
  activity: ActivityLevel;
  diet: DietQuality;
  bodyFrame: BodyFrame;
  skinType: SkinType;
}

export interface DoshaLevels {
  vata: number;
  pitta: number;
  kapha: number;
}

export type BodyPart = 'head' | 'chest' | 'stomach' | 'joints';

export type RiskLevel = 'normal' | 'warning' | 'critical';

export interface BodyPartRisk {
  part: BodyPart;
  level: RiskLevel;
  condition: string;
  dosha: 'vata' | 'pitta' | 'kapha';
}

export interface Remedy {
  diet: string;
  yoga: string;
  herb: string;
}

export const CONDITIONS: Record<BodyPart, { name: string; dosha: 'vata' | 'pitta' | 'kapha'; remedy: Remedy }> = {
  head: {
    name: 'Migraine / Insomnia',
    dosha: 'vata',
    remedy: {
      diet: 'Warm milk with ashwagandha before bed. Avoid caffeine and cold foods.',
      yoga: 'Shavasana (Corpse Pose) - 15 minutes daily',
      herb: 'Brahmi (Bacopa monnieri) - Enhances cognitive function and calms the mind',
    },
  },
  chest: {
    name: 'Respiratory Congestion',
    dosha: 'kapha',
    remedy: {
      diet: 'Warm ginger-honey tea. Light, spicy foods. Avoid dairy and cold beverages.',
      yoga: 'Bhujangasana (Cobra Pose) - Opens the chest',
      herb: 'Tulsi (Holy Basil) - Clears respiratory passages and boosts immunity',
    },
  },
  stomach: {
    name: 'Acidity / Digestive Fire',
    dosha: 'pitta',
    remedy: {
      diet: 'Cooling foods: cucumber, coconut water, mint. Avoid spicy, fried, and sour foods.',
      yoga: 'Vajrasana (Thunderbolt Pose) - Post-meal for 10 minutes',
      herb: 'Shatavari - Cools the digestive system and reduces inflammation',
    },
  },
  joints: {
    name: 'Arthritis / Joint Pain',
    dosha: 'vata',
    remedy: {
      diet: 'Warm, oily foods. Sesame oil massage. Avoid raw vegetables and cold foods.',
      yoga: 'Trikonasana (Triangle Pose) - Improves joint flexibility',
      herb: 'Guggulu - Anti-inflammatory, supports joint health',
    },
  },
};
