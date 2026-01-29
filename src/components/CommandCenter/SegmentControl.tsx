import { motion } from 'framer-motion';

interface SegmentControlProps<T extends string> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentControl<T extends string>({ 
  label, 
  options, 
  value, 
  onChange 
}: SegmentControlProps<T>) {
  return (
    <div className="mb-1">
      <label className="section-title block mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <motion.button
            key={option}
            onClick={() => onChange(option)}
            className={`toggle-btn ${value === option ? 'active' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
