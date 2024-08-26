function hexToHsl(hexColor: string): [number, number, number] {
  // Remove leading '#'
  if (hexColor.startsWith("#")) {
    hexColor = hexColor.slice(1);
  }

  // Expand shorthand hex color
  if (hexColor.length === 3) {
    const expandedHex = [];
    for (let i = 0; i < hexColor.length; i++) {
      expandedHex.push(hexColor[i].repeat(2));
    }
    hexColor = expandedHex.join("");
  }

  // Convert hex to RGB
  const rgbValues = [
    parseInt(hexColor.slice(0, 2), 16),
    parseInt(hexColor.slice(2, 4), 16),
    parseInt(hexColor.slice(4, 6), 16),
  ];

  // Calculate HSL
  let r = rgbValues[0] / 255;
  let g = rgbValues[1] / 255;
  let b = rgbValues[2] / 255;

  const maxVal = Math.max(r, g, b);
  const minVal = Math.min(r, g, b);

  const delta = maxVal - minVal;

  let h: number | null = null;
  if (delta === 0) {
    // If the color is a shade of gray
    h = 0;
  } else if (maxVal === r) {
    // If red is the maximum value
    h = 60 * ((g - b) / delta);
  } else if (maxVal === g) {
    // If green is the maximum value
    h = 120 + 60 * ((b - r) / delta);
  } else {
    // If blue is the maximum value
    h = 240 + 60 * ((r - g) / delta);
  }

  if (h < 0) {
    h += 360;
  }

  const s = delta === 0 ? 0 : delta / maxVal;

  const l = (maxVal + minVal) / 2;

  return [h, s * 100, l * 100];
}

function hslToCss(hslValues: number[]): string {
  const [h, s, l] = hslValues.map((val) => Math.round(val));

  // Adjust lightness to be within 0-100 range (since it's already in this range)
  return `${h} ${s}% ${l}%`;
}

export function convertToShad(hex: string) {
  const hsl = hexToHsl(hex);
  const shad = hslToCss(hsl);
  return shad;
}
