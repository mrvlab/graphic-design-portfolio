'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { convertSvgToPath } from '@/utils/svgConverter';

const PARTICLE_SIZE = 13;
const GRID_GAP = 14;

// SVG path for an X shape
const X_PATH =
  'M1.12745 0.671875L6.89741 6.70064M0.998047 6.57124L7.02681 0.801275';

const svgString = `<svg width="2485" height="208" viewBox="0 0 2485 208" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2172_13730)">
<path d="M641.8 152.4C641.5 166.3 642.1 180.3 641.8 194.2H655.8V208.1H697.7V194.2H725.6V180.3H739.6V166.4H753.6V152.5H767.6V194.3H781.6V208.2H809.5V194.3H837.4V180.4H851.4V166.5H865.4V152.6H879.4V194.4H893.4V208.3H935.3V194.4H963.2V180.5H977.2V166.6H1033V180.5H1047V194.4H1061V208.3H1102.9V194.4H1130.8V180.5H1158.7V166.6H1172.7V152.7H1186.7V138.8H1200.7V124.9H1214.7V97.1002H1186.8V111H1172.8V124.9C1168.1 124.9 1163.4 124.8 1158.8 124.9C1158.7 129.5 1158.8 134.2 1158.8 138.8C1149.5 138.8 1140.2 138.8 1130.9 138.8C1130.9 143.4 1130.9 148.1 1130.9 152.7H1116.9V166.6H1089V180.6H1076L1075 166.6H1061V138.8C1084.2 138.7 1107.6 139 1130.8 138.8C1130.8 134.2 1130.8 129.5 1130.8 124.9C1140.1 124.7 1149.4 125.1 1158.7 124.9C1159 111 1158.4 97.0002 1158.7 83.1002H1144.7V69.2002H1088.9V83.1002H1074.9V97.0002H1047V110.9H1033V124.8H1019V138.7H1005V83.0002H991V69.1002H963.1V96.9002H977.1V138.7H963.2V152.6H949.2V166.5H921.3V180.4H907.3V152.6H921.3V138.7H935.3V110.9H949.3V69.1002H921.4V83.0002H893.5V96.9002H879.5V110.8H865.5V124.7H851.5V138.6H837.5V152.5H823.5V166.4H795.6V152.5H809.6V138.6H823.6V124.7H837.6V69.0002H809.7V82.9002H795.7V96.8002C786.4 96.8002 777.1 96.8002 767.8 96.8002C767.7 101.4 767.8 106.1 767.8 110.7H753.8V124.6H739.8V138.5H725.8V152.4H711.8V166.3H697.8V180.2H669.9V152.4H683.8V138.5H697.8V124.6H711.8V110.7H725.8V96.8002C739.8 96.8002 753.8 96.9002 767.7 96.8002C767.9 87.5002 767.5 78.2002 767.7 68.9002L753.7 67.9002V55.0002H767.7V13.2002H739.8V41.3002H725.9V55.2002H711.9V69.1002H670V83.0002H656V96.9002H642V110.8H628V124.7H614V138.6H600V152.5C595.3 152.5 590.6 152.5 586 152.5L586.3 152.7M641.8 152.4C646.4 152.4 651.1 152.4 655.8 152.4V138.5H641.8C641.8 143.1 641.9 147.8 641.8 152.4ZM641.8 152.4C637.2 152.4 632.5 152.4 627.8 152.4V166.3H613.8V180.2H599.8V194.1H571.9V208H544V194.1H516.1V208H474.2V194.1H460.2V180.2H432.3V194.1H404.4V208H362.5V194.1H348.5V180.2H334.5V166.3H320.5V180.2H306.5V194.1H278.6V208H236.7V194.1H222.7V138.4H236.7V124.5H208.8V96.7002H222.8V82.8002H236.8V68.9002H250.8V96.8002H264.8V82.9002H278.8V69.0002H320.7V82.9002H334.7C334.5 92.2002 334.9 101.5 334.7 110.8C330.1 110.8 325.4 110.8 320.7 110.8C320.7 115.4 320.7 120.1 320.7 124.7C306.8 125 292.7 124.5 278.8 124.7V138.6H264.8V152.5H250.9V180.3H264.9V166.4H292.8V152.5H306.8V138.6H320.8C320.8 134 320.8 129.3 320.8 124.7C325.4 124.6 330.1 124.7 334.8 124.7C334.8 120.1 334.7 115.4 334.8 110.8C339.4 110.8 344.1 110.8 348.8 110.8V96.9002H376.7V83.0002H390.7V69.1002H446.5V83.0002H460.5C460.2 96.9002 460.8 110.9 460.5 124.8C451.2 125 441.9 124.6 432.6 124.8C432.6 129.4 432.6 134.1 432.6 138.7C409.4 138.9 386 138.6 362.8 138.7V166.5H376.8L377.8 180.5H390.8V166.5H418.7V152.6H432.7C432.7 148 432.7 143.3 432.7 138.7C442 138.7 451.3 138.7 460.6 138.7C460.6 134.1 460.5 129.4 460.6 124.8C465.2 124.7 469.9 124.8 474.6 124.8V110.9H488.6V97.0002H502.6V83.1002H530.5V69.2002H572.4V83.1002H600.3V69.2002H614.3V111H600.3V124.9H586.3C586.2 134.1 586.5 143.5 586.3 152.7M586.3 152.7C581.7 152.7 577 152.7 572.3 152.7V166.6H586.3C586.3 162 586.2 157.3 586.3 152.7ZM418.5 96.8002H404.5V110.7H418.5V96.8002ZM558.1 96.8002H530.2V110.7H516.2V124.6H502.2V138.5H488.3V180.3H502.3V166.4H530.2V152.5H544.2V124.7H558.2V96.9002L558.1 96.8002ZM1116.4 96.8002H1102.4V110.7H1116.4V96.8002Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1493.3 54.9998C1488.7 54.9998 1484 54.9998 1479.3 54.9998V68.8998H1493.3C1493.3 64.2998 1493.2 59.5998 1493.3 54.9998ZM1493.3 54.9998C1497.9 54.9998 1502.6 54.9998 1507.3 54.9998V41.0998H1521.3V27.1998H1493.4C1493.2 36.4998 1493.6 45.7998 1493.4 54.9998H1493.3ZM1353.7 82.7998C1354.1 64.2998 1353.4 45.5998 1353.7 27.0998H1367.7V13.1998H1381.7V-0.700195H1423.6V27.0998H1395.7V40.9998H1381.7V68.7998H1395.7V82.6998H1437.6V68.7998H1451.6V40.9998H1465.6V13.1998H1493.5V-0.700195H1535.4V13.1998H1549.4V54.9998H1535.4C1535.3 64.1998 1535.6 73.5998 1535.4 82.7998C1526.1 82.9998 1516.8 82.5998 1507.5 82.7998C1507.5 87.3998 1507.6 92.0998 1507.5 96.6998C1493.6 96.7998 1479.6 96.6998 1465.6 96.6998V110.6H1451.6V124.5H1437.7V152.3H1423.7V166.2H1409.7V180.1H1395.7V194H1353.8V207.9H1311.9V194H1270V166.2H1256V110.5H1270V96.5998H1284V82.6998C1307.2 83.0998 1330.6 82.1998 1353.8 82.6998C1353.7 87.2998 1353.8 91.9998 1353.8 96.5998H1325.9V110.5H1298V124.4H1284V152.2H1298V166.1H1312V180H1353.9V166.1H1381.8V152.2H1395.8V138.3H1409.7V110.5H1381.8V96.5998H1367.8V82.6998C1363.2 82.6998 1358.5 82.7998 1353.9 82.6998L1353.7 82.7998Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2010.4 152.6C2010.6 143.4 2010.3 134 2010.4 124.8H2024.4V110.9H2038.4V69.0999H1996.5V82.9999H1982.5V96.8999H1968.5V110.8H1954.5V124.7H1940.5V138.6H1926.5V82.8999H1912.5V68.9999H1884.6V82.8999H1856.7V68.9999H1828.8V82.8999H1814.8V96.7999H1800.8V110.7H1786.8V124.6C1777.5 124.6 1768.2 124.6 1758.9 124.6C1758.9 129.2 1758.9 133.9 1758.9 138.5H1744.9V152.4H1730.9V166.3H1716.9V180.2H1689V152.4H1702.9V138.5H1716.9V124.6C1730.9 124.6 1744.9 124.7 1758.8 124.6C1758.8 120 1758.8 115.3 1758.8 110.7H1772.8V68.8999H1730.9V82.7999H1716.9V96.6999H1702.9V68.8999H1675V82.7999H1661V96.6999H1647V110.6H1633V124.5C1623.7 124.7 1614.4 124.3 1605.1 124.5C1605.1 129.1 1605.1 133.8 1605.1 138.4C1600.4 138.4 1595.7 138.3 1591.1 138.4C1591.1 143 1591.1 147.7 1591.1 152.3H1577.1V166.2H1549.2V180.2H1536.2L1535.2 166.2H1521.2V138.4C1544.4 138 1567.8 138.9 1591 138.4C1591 133.8 1591 129.1 1591 124.5C1595.7 124.5 1600.4 124.6 1605 124.5C1605 119.9 1605 115.2 1605 110.6H1619V82.7999H1605V68.8999H1549.2V82.7999C1544.5 82.7999 1539.8 82.6999 1535.2 82.7999L1535.3 83.1999C1535.2 87.7999 1535.3 92.4999 1535.3 97.0999C1526 97.0999 1516.7 97.0999 1507.4 97.0999C1507.2 106.3 1507.5 115.7 1507.4 124.9H1493.4V194.5H1521.3V208.4H1563.2V194.5H1591.1V180.6H1605.1V166.7H1633V152.8H1647V138.9C1651.7 138.9 1656.4 138.9 1661 138.9M2010.4 152.6C2005.8 152.6 2001.1 152.6 1996.4 152.6C1996.4 157.2 1996.4 161.9 1996.4 166.5M2010.4 152.6C2010.3 157.2 2010.4 161.9 2010.4 166.5C2005.7 166.5 2001 166.5 1996.4 166.5M2010.4 152.6C2015 152.6 2019.7 152.6 2024.4 152.6V138.7H2038.4V124.8H2052.4V110.9H2080.3V96.9999H2094.3V83.0999H2108.3V69.1999H2164.1V96.9999H2178.1V109.9L2164.1 110.9C2164.1 115.5 2164.1 120.2 2164.1 124.8C2154.8 124.8 2145.5 124.8 2136.2 124.8V96.9999H2122.2V110.9H2108.2V124.8H2094.2V138.7H2080.2V180.5H2108.1V166.6H2136V152.7H2150V138.8H2164C2164 134.2 2164 129.5 2164 124.9H2191.9V111H2205.9V97.0999H2219.9V83.1999H2247.8V69.2999H2303.6C2303.3 87.7999 2304 106.5 2303.6 125M1996.4 166.5C1991.8 166.5 1987.1 166.5 1982.4 166.5V180.4H1996.4C1996.4 175.8 1996.4 171.1 1996.4 166.5ZM2303.6 125C2299 125 2294.3 125 2289.6 125C2289.6 129.6 2289.6 134.3 2289.6 138.9M2303.6 125C2303.5 129.6 2303.6 134.3 2303.6 138.9C2298.9 138.9 2294.2 138.8 2289.6 138.9M2303.6 125C2308.2 125 2312.9 125 2317.6 125V111.1H2331.6V97.1999H2345.6V83.2999H2359.6V69.3999H2387.5V111.2H2401.5V139H2429.4V125.1H2443.4V111.2H2457.4V97.2999H2485.3V125.1H2471.3V139H2457.3V152.9H2443.3V166.8H2429.3V180.7H2415.3V194.6H2387.4V208.5H2345.5V194.6H2331.5V166.8H2359.4L2360.4 180.8H2373.4V166.8H2387.4V152.9H2373.4V125.1H2345.5V139H2331.5V152.9H2317.5V166.8H2303.5V180.7H2289.5V194.6H2247.6V208.5H2205.7V194.6H2191.7V166.8H2163.8V180.7H2149.8V194.6H2107.9V208.5H2080V194.6H2052.1V166.8H2038.1V180.7H2024.1V194.6H2010.1V208.5H1968.2V194.6H1954.2V166.8H1898.4V180.7H1870.5V194.6H1842.6V208.5H1814.7V194.6H1800.7V180.7H1786.7V166.8H1758.8V180.7H1744.8V194.6H1716.9V208.5H1675V194.6H1661C1661.3 176.1 1660.6 157.4 1661 138.9M2289.6 138.9C2266.4 139.4 2243 138.5 2219.8 138.9V152.8H2205.8V165.7L2219.8 166.7V180.6H2247.7V166.7H2275.6V152.8H2289.6C2289.6 148.2 2289.6 143.5 2289.6 138.9ZM1661 138.9C1665.6 138.9 1670.3 138.9 1675 138.9C1675 134.3 1675 129.6 1675 125M1661 138.9C1661.1 134.3 1661 129.6 1661 125C1665.7 125 1670.4 125 1675 125M1675 125C1679.6 125 1684.3 125 1689 125V111.1H1675C1675 115.7 1675 120.4 1675 125ZM1577.1 96.7999H1563.1V110.7H1577.1V96.7999ZM1898.1 96.7999H1856.2V124.6H1842.2V138.5H1828.2V180.3H1842.2V166.4H1856.2V152.5H1884.1V124.7H1898.1V96.7999ZM2275 96.7999H2247.1V110.7H2275V96.7999Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M181.2 -0.700195V13.1998H195.2V68.8998H181.2V82.7998H69.5V68.8998H56.5L55.5 82.8998H41.5V110.7H27.5V152.5H41.5V166.4H55.5V180.3H97.4V166.4H125.3V152.5H139.3V138.6H153.2V110.8H181.1V138.6H167.1V166.4H153.1V180.3H139.1V194.2H97.2V208.1H55.3V194.2H27.4V180.3H13.4V166.4H-0.5V96.7998H13.5V68.9998H27.5V27.1998H13.5V13.2998H55.4V27.1998H83.3V13.2998H125.2V-0.700195H181.2ZM167.3 27.1998H125.4V41.0998H97.5V54.9998H167.3V27.1998Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2079.6 13.2002V55.0002H2037.7V41.1002H2051.6V13.2002H2079.6Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M893.1 13.1997V41.0997H879.1V54.9997H851.2V27.1997H865.2V13.1997H893.1Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
`;

// Convert SVG to path
const TEXT_PATHS = convertSvgToPath(svgString);

class Particle {
  targetX: number;
  targetY: number;
  x: number;
  y: number;

  constructor(targetX: number, targetY: number, x: number, y: number) {
    this.targetX = targetX;
    this.targetY = targetY;
    this.x = x;
    this.y = y;
  }
}

export default function AnimatedText() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('AnimatedText useEffect running');

    if (!containerRef.current) {
      console.log('Refs not ready yet');
      return;
    }

    const container = containerRef.current;

    // Create a temporary SVG element
    const tempSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    tempSvg.setAttribute('width', '2485');
    tempSvg.setAttribute('height', '208');
    tempSvg.setAttribute('viewBox', '0 0 2485 208');
    document.body.appendChild(tempSvg);

    const newParticles: Particle[] = [];
    const svgWidth = 2485;
    const svgHeight = 208;

    // Create paths and add to temp SVG
    const pathElements = TEXT_PATHS.map((pathData) => {
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'black');
      tempSvg.appendChild(path);
      return path;
    });

    // Create grid of points
    for (let x = 0; x < svgWidth; x += GRID_GAP) {
      for (let y = 0; y < svgHeight; y += GRID_GAP) {
        const point = tempSvg.createSVGPoint();
        point.x = x;
        point.y = y;

        // Check if point is inside any path
        const isInside = pathElements.some((path) => {
          try {
            return path.isPointInFill(point);
          } catch (e) {
            console.error('Error checking point:', e);
            return false;
          }
        });

        if (isInside) {
          const randAngle = Math.random() * Math.PI * 2;
          const randDist = Math.random() * 300;

          newParticles.push(
            new Particle(
              x,
              y,
              x + Math.cos(randAngle) * randDist,
              y + Math.sin(randAngle) * randDist
            )
          );
        }
      }
    }

    console.log(`Created ${newParticles.length} particles`);

    // Cleanup
    document.body.removeChild(tempSvg);

    setParticles(newParticles);

    // Set up scaling and positioning
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate scale to fit
    const scaleX = (containerWidth * 0.8) / svgWidth;
    const scaleY = (containerHeight * 0.8) / svgHeight;
    const newScale = Math.min(scaleX, scaleY);
    setScale(newScale);

    // Calculate offset to center
    const offsetX = (containerWidth - svgWidth * newScale) / 2;
    const offsetY = (containerHeight - svgHeight * newScale) / 2;
    setOffset({ x: offsetX, y: offsetY });

    // Handle resize
    const handleResize = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const scaleX = (containerWidth * 0.8) / svgWidth;
      const scaleY = (containerHeight * 0.8) / svgHeight;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);

      const offsetX = (containerWidth - svgWidth * newScale) / 2;
      const offsetY = (containerHeight - svgHeight * newScale) / 2;
      setOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('Rendering with', particles.length, 'particles');

  return (
    <div
      ref={containerRef}
      className='relative w-full h-full flex items-center justify-center bg-white'
    >
      <div
        className='relative'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'absolute',
          left: offset.x,
          top: offset.y,
        }}
      >
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className='absolute'
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              x: particle.targetX,
              y: particle.targetY,
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              mass: 0.5,
              duration: 2,
            }}
          >
            <svg
              width={PARTICLE_SIZE}
              height={PARTICLE_SIZE}
              viewBox='0 0 8 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{
                transform: 'translate(-50%, -50%)',
              }}
            >
              <path d={X_PATH} stroke='#979797' strokeWidth='0.4' />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
