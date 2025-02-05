import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Line, G, Text as SvgText } from 'react-native-svg';
import styles from './CircularCounter.styles';
import { Image, StyleSheet } from 'react-native';

export type CircularCounterProps = {
  value: number;         // Valeur actuelle (0 à 3000)
  maxValue?: number;     // Valeur maximale (par défaut 3000)
  size?: number;         // Diamètre du cercle (ex. 200)
  strokeWidth?: number;  // Épaisseur de l'arc (ex. 15)
};

const CircularCounter: React.FC<CircularCounterProps> = ({
  value,
  maxValue = 3000,
  size = 300,
  strokeWidth = 15,
}) => {
  // Clamp de la valeur entre 0 et maxValue
  const clampedValue = Math.min(Math.max(value, 0), maxValue);
  const halfSize = size / 2;
  const radius = halfSize - strokeWidth / 2;

  // Pour orienter l'arc afin que le gap se trouve en haut,
  // on définit : startAngle = 120° et totalAngle = 300°.
  const startAngle = 140;
  const totalAngle = 260;
  const fraction = clampedValue / maxValue;
  const progressAngle = startAngle + fraction * totalAngle;

  // Fonction de conversion polaire → cartésienne
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Arc de fond (complet sur 300°) avec le rayon principal
  const bgStart = polarToCartesian(halfSize, halfSize, radius, startAngle + totalAngle);
  const bgEnd = polarToCartesian(halfSize, halfSize, radius, startAngle);
  const largeArcFlag = totalAngle <= 180 ? '0' : '1';
  const backgroundPath = [
    'M', bgStart.x, bgStart.y,
    'A', radius, radius, 0, largeArcFlag, 0, bgEnd.x, bgEnd.y,
  ].join(' ');

  // Arc de progression (partiel selon la valeur) avec le même rayon
  const progressStart = polarToCartesian(halfSize, halfSize, radius, startAngle);
  const progressEnd = polarToCartesian(halfSize, halfSize, radius, progressAngle);
  const progressAngleDiff = progressAngle - startAngle;
  const progressLargeArcFlag = progressAngleDiff <= 180 ? '0' : '1';
  const progressPath = [
    'M', progressStart.x, progressStart.y,
    'A', radius, radius, 0, progressLargeArcFlag, 1, progressEnd.x, progressEnd.y,
  ].join(' ');

  // === Nouvelle partie : Ligne de graduation placée à l'intérieur de l'arc de progression ===
  // On définit un rayon pour la ligne de graduation, ici à l'intérieur de l'arc principal
  const graduationRadius = radius - strokeWidth / 2 - 5; // Décalage vers l'intérieur
  const gradStart = polarToCartesian(halfSize, halfSize, graduationRadius, startAngle + totalAngle);
  const gradEnd = polarToCartesian(halfSize, halfSize, graduationRadius, startAngle);
  const graduationPath = [
    'M', gradStart.x, gradStart.y,
    'A', graduationRadius, graduationRadius, 0, largeArcFlag, 0, gradEnd.x, gradEnd.y,
  ].join(' ');

  // Ticks et labels pour les graduations (0, 1000, 2000, 3000)
  const tickValues = [0, 1000, 2000, 3000];
  const tickLength = 8;
  const ticks = tickValues.map((tickValue) => {
    const angle = startAngle + (tickValue / maxValue) * totalAngle;
    const outerPoint = polarToCartesian(halfSize, halfSize, graduationRadius, angle);
    const innerPoint = polarToCartesian(halfSize, halfSize, graduationRadius - tickLength, angle);
    // Position pour le label : à l'intérieur du cercle, légèrement décalé
    const textPoint = polarToCartesian(halfSize, halfSize, graduationRadius - tickLength - 10, angle);
    return { tickValue, angle, outerPoint, innerPoint, textPoint };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Arc de fond (gris clair) */}
        <Path
          d={backgroundPath}
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Arc de progression en bleu */}
        <Path
          d={progressPath}
          stroke="blue"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Ligne de graduation en bleu (placée à l'intérieur de l'arc de progression) */}
        <Path
          d={graduationPath}
          stroke="grey"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
        {/* Ticks et labels sur la ligne de graduation */}
        {ticks.map((tick, index) => (
          <G key={`tick-${index}`}>
            <Line
              x1={tick.outerPoint.x}
              y1={tick.outerPoint.y}
              x2={tick.innerPoint.x}
              y2={tick.innerPoint.y}
              stroke="grey"
              strokeWidth={2}
            />
            <SvgText
              x={tick.textPoint.x}
              y={tick.textPoint.y}
              fontSize="12"
              fill="grey"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {tick.tickValue}
            </SvgText>
          </G>
        ))}
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.valueText}>{clampedValue}<Text style={styles.unitText}> pas</Text></Text> 
        <Image source={require('../../../../../FrontEnd/assets/icone_basket.png')} style={styles.icon} />
      </View>
    </View>
  );
};

export default CircularCounter;
