export function msToSongTime(ms: number) {
  const seconds = Math.floor(ms / 1000);

  const ss = String(seconds % 60).padStart(2, "0");
  const mm = ((seconds / 60) | 0) % 60;
  const hh = (seconds / 60 / 60) | 0;

  if (Number(hh) > 0) return `${hh}:${mm}:${ss}`;
  return `${mm}:${ss}`;
}
