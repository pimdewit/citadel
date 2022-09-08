export function mix(a: number, b: number, alpha: number) {
  return a * (1 - alpha) + b * alpha;
}
