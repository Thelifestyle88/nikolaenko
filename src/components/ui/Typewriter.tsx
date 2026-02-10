'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Typewriter.module.css';

type TypewriterProps = {
  text: string;
  delay?: number;
  speed?: number;
  duration?: number;
  humanize?: boolean;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'span';
  showCursor?: boolean;
  onComplete?: () => void;
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const NEARBY_KEYS: Record<string, string> = {
  а: 'пс', б: 'юь', в: 'аы', г: 'нш', д: 'лж', е: 'нк', ж: 'дэ',
  з: 'хщ', и: 'мш', й: 'цф', к: 'ен', л: 'до', м: 'ис', н: 'ег',
  о: 'лр', п: 'ар', р: 'по', с: 'ам', т: 'иь', у: 'цк', ф: 'йы',
  х: 'зъ', ц: 'йу', ч: 'яс', ш: 'гщ', щ: 'шз', ъ: 'хэ', ы: 'вф',
  ь: 'тб', э: 'жъ', ю: 'бь', я: 'чс',
  a: 'sq', b: 'vn', c: 'xv', d: 'sf', e: 'rw', f: 'dg', g: 'fh',
  h: 'gj', i: 'uo', j: 'hk', k: 'jl', l: 'k;', m: 'n,', n: 'bm',
  o: 'ip', p: 'o[', q: 'wa', r: 'et', s: 'ad', t: 'ry', u: 'yi',
  v: 'cb', w: 'qe', x: 'zc', y: 'tu', z: 'xa',
};

function getTypo(char: string): string {
  const lower = char.toLowerCase();
  const nearby = NEARBY_KEYS[lower];
  if (!nearby) return char;
  const typo = nearby[getRandomInt(0, nearby.length - 1)];
  return char === char.toUpperCase() ? typo.toUpperCase() : typo;
}

type Action = { type: 'add'; char: string; delay: number }
  | { type: 'delete'; delay: number };

function buildHumanActions(text: string, totalDuration: number): Action[] {
  const actions: Action[] = [];
  const typoChance = 0.04;
  const pauseChars = new Set(['.', ',', '—', ':', ';']);

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    // Иногда делаем опечатку
    if (Math.random() < typoChance && ch !== ' ' && i > 3 && i < text.length - 2) {
      actions.push({ type: 'add', char: getTypo(ch), delay: 0 });
      actions.push({ type: 'delete', delay: 0 });
      actions.push({ type: 'add', char: ch, delay: 0 });
    } else {
      actions.push({ type: 'add', char: ch, delay: 0 });
    }
  }

  // Распределяем время
  let totalWeight = 0;
  const weights: number[] = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let w = 1;

    if (action.type === 'delete') {
      w = 0.3; // быстро стираем
    } else if (action.type === 'add') {
      if (action.char === ' ') {
        w = 0.6 + Math.random() * 0.8;
      } else if (pauseChars.has(action.char)) {
        w = 2.5 + Math.random() * 3; // пауза на знаках препинания
      } else {
        w = 0.5 + Math.random() * 1.5; // рандомная скорость
      }
      // Иногда случайная длинная пауза "задумался"
      if (Math.random() < 0.02) {
        w += 3 + Math.random() * 4;
      }
    }

    weights.push(w);
    totalWeight += w;
  }

  const scale = totalDuration / totalWeight;
  for (let i = 0; i < actions.length; i++) {
    actions[i].delay = weights[i] * scale;
  }

  return actions;
}

export function Typewriter({
  text,
  delay = 0,
  speed,
  duration,
  humanize = false,
  className,
  as: Tag = 'span',
  showCursor = false,
  onComplete,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const actionsRef = useRef<Action[]>([]);
  const stepRef = useRef(0);
  const bufferRef = useRef('');

  const charSpeed = useMemo(() => {
    if (!humanize) {
      if (duration && text.length > 0) return duration / text.length;
      return speed ?? 50;
    }
    return 0;
  }, [duration, speed, text.length, humanize]);

  // Генерируем экшены для human-режима один раз
  useEffect(() => {
    if (humanize && text) {
      actionsRef.current = buildHumanActions(text, duration ?? 3000);
      stepRef.current = 0;
      bufferRef.current = '';
    }
  }, [humanize, text, duration]);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  // Обычный режим
  useEffect(() => {
    if (humanize || !started) return;

    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, charSpeed);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [humanize, started, displayed, text, charSpeed, onComplete]);

  // Human-режим
  useEffect(() => {
    if (!humanize || !started) return;

    const actions = actionsRef.current;
    const step = stepRef.current;

    if (step >= actions.length) {
      if (!done) {
        setDone(true);
        onComplete?.();
      }
      return;
    }

    const action = actions[step];
    const timeout = setTimeout(() => {
      if (action.type === 'add') {
        bufferRef.current += action.char;
      } else if (action.type === 'delete') {
        bufferRef.current = bufferRef.current.slice(0, -1);
      }
      stepRef.current = step + 1;
      setDisplayed(bufferRef.current);
    }, action.delay);

    return () => clearTimeout(timeout);
  }, [humanize, started, displayed, done, onComplete]);

  if (!started) {
    return (
      <Tag className={className}>
        <span style={{ visibility: 'hidden' }}>{text}</span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {displayed}
      <AnimatePresence>
        {showCursor && !done && (
          <motion.span
            className={styles.cursor}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </Tag>
  );
}
