import { useMemo } from 'react';
import type { HealthInputs, DoshaLevels, BodyPartRisk, RiskLevel } from '@/types/health';

const sleepToVata: Record<string, number> = {
  '< 4 hrs': 40,
  '5-6 hrs': 20,
  '7-8 hrs': 5,
  '> 9 hrs': 10,
};

const stressToVata: Record<string, number> = {
  'Very Low': 5,
  'Low': 15,
  'Moderate': 25,
  'High': 40,
  'Extreme': 55,
};

const stressToPitta: Record<string, number> = {
  'Very Low': 5,
  'Low': 10,
  'Moderate': 20,
  'High': 35,
  'Extreme': 50,
};

const activityToKapha: Record<string, number> = {
  'Sedentary': 45,
  'Light Active': 30,
  'Active': 15,
  'Athlete': 5,
};

const dietToPitta: Record<string, number> = {
  'Processed/Junk': 40,
  'Mixed': 20,
  'Home Cooked/Fresh': 5,
};

const bodyFrameToKapha: Record<string, number> = {
  'Petite/Thin': 5,
  'Medium/Athletic': 20,
  'Heavy/Broad': 40,
};

const skinToPitta: Record<string, number> = {
  'Dry/Rough': 5,
  'Oily/Sensitive': 30,
  'Soft/Moist': 15,
};

const skinToVata: Record<string, number> = {
  'Dry/Rough': 30,
  'Oily/Sensitive': 5,
  'Soft/Moist': 10,
};

export function useDoshaCalculator(inputs: HealthInputs) {
  const doshaLevels = useMemo<DoshaLevels>(() => {
    // Calculate raw scores
    let vataRaw = 
      sleepToVata[inputs.sleep] + 
      stressToVata[inputs.stress] + 
      skinToVata[inputs.skinType];
    
    let pittaRaw = 
      stressToPitta[inputs.stress] +
      dietToPitta[inputs.diet] +
      skinToPitta[inputs.skinType];
    
    let kaphaRaw = 
      activityToKapha[inputs.activity] +
      bodyFrameToKapha[inputs.bodyFrame] +
      (inputs.sleep === '> 9 hrs' ? 25 : 5);

    // Normalize to 100%
    const total = vataRaw + pittaRaw + kaphaRaw;
    
    const vata = Math.round((vataRaw / total) * 100);
    const pitta = Math.round((pittaRaw / total) * 100);
    const kapha = 100 - vata - pitta; // Ensure exact 100%

    return { vata, pitta, kapha };
  }, [inputs]);

  const getRiskLevel = (value: number): RiskLevel => {
    if (value >= 42) return 'critical';
    if (value >= 36) return 'warning';
    return 'normal';
  };

  const bodyPartRisks = useMemo<BodyPartRisk[]>(() => {
    const risks: BodyPartRisk[] = [];
    
    const vataLevel = getRiskLevel(doshaLevels.vata);
    if (vataLevel !== 'normal') {
      risks.push({ part: 'head', level: vataLevel, condition: 'Migraine / Insomnia', dosha: 'vata' });
      risks.push({ part: 'joints', level: vataLevel, condition: 'Arthritis / Joint Pain', dosha: 'vata' });
    }
    
    const pittaLevel = getRiskLevel(doshaLevels.pitta);
    if (pittaLevel !== 'normal') {
      risks.push({ part: 'stomach', level: pittaLevel, condition: 'Acidity / Digestive Fire', dosha: 'pitta' });
    }
    
    const kaphaLevel = getRiskLevel(doshaLevels.kapha);
    if (kaphaLevel !== 'normal') {
      risks.push({ part: 'chest', level: kaphaLevel, condition: 'Respiratory Congestion', dosha: 'kapha' });
    }

    return risks;
  }, [doshaLevels]);

  return { doshaLevels, bodyPartRisks, getRiskLevel };
}
