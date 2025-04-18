import SVGPathCommander from 'svg-path-commander';

export function convertSvgToPath(svgString: string) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return [];
  }

  // Create a temporary SVG element
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = svgString;
  const svgElement = tempDiv.querySelector('svg');

  if (!svgElement) {
    throw new Error('No SVG element found in the provided string');
  }

  // Get all path elements
  const paths = svgElement.querySelectorAll('path');

  // Convert each path to a normalized and optimized path string
  return Array.from(paths).map((path) => {
    const pathData = path.getAttribute('d') || '';
    const commander = new SVGPathCommander(pathData);
    return commander.normalize().toString();
  });
}
