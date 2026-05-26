import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedPageProps {
  children: ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideLeft';
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  },
};

export function AnimatedPage({
  children,
  variant = 'slideUp',
}: AnimatedPageProps) {
  const v = variants[variant];

  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
