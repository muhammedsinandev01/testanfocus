// ============================================================================
// AN FOCUS — ClassName Merge Utility
// ============================================================================

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
