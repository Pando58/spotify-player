export function mapRange(val: number, inStart: number, inEnd: number, outStart: number, outEnd: number) {
  return outStart + ((outEnd - outStart) / (inEnd - inStart)) * (val - inStart);
}
