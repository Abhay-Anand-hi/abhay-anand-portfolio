// Helper utilities for Easter Eggs and Secret Level tracking in sessionStorage

const SESSION_STORAGE_KEY = 'abhay_easter_eggs_discovered';

export const EASTER_EGG_LIST = [
  'whoami',
  'neofetch',
  'sudo',
  'coffee',
  'robot',
  'theme',
  'secret',
  'fortune',
  'love',
  '42',
  'hack',
  'matrix',
  'abhay.exe',
  'exit',
  'konami',
  'abhay_typed',
  'cursor',
] as const;

export type EasterEggId = typeof EASTER_EGG_LIST[number];

/**
 * Retrieves the list of discovered easter egg IDs in the current session
 */
export function getDiscoveredEasterEggs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Records a newly discovered Easter egg in sessionStorage
 * Returns { isNew: boolean, count: number, total: number }
 */
export function recordEasterEggDiscovery(eggId: string): { isNew: boolean; count: number; total: number } {
  if (typeof window === 'undefined') return { isNew: false, count: 0, total: EASTER_EGG_LIST.length };
  
  try {
    const current = getDiscoveredEasterEggs();
    const isNew = !current.includes(eggId);
    
    let updated = current;
    if (isNew) {
      updated = [...current, eggId];
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));

      // Dispatch global event for listeners
      window.dispatchEvent(
        new CustomEvent('easter-egg-unlocked', {
          detail: {
            eggId,
            count: updated.length,
            total: EASTER_EGG_LIST.length,
            isSecretLevel: updated.length === 5 || updated.length === 10,
          },
        })
      );
    }

    return {
      isNew,
      count: updated.length,
      total: EASTER_EGG_LIST.length,
    };
  } catch {
    return { isNew: false, count: 0, total: EASTER_EGG_LIST.length };
  }
}

/**
 * Triggers a custom robot reaction event
 */
export function triggerRobotReaction(action: string, message: string, emote?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('robot-easter-egg', {
      detail: {
        action,
        message,
        emote,
      },
    })
  );
}

/**
 * Triggers ABHAY logo glow in Navbar
 */
export function triggerAbhayLogoGlow() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('glow-abhay'));
}
