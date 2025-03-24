
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const toLowerCaseWithDash = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
};