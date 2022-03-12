import React from 'react';
import { View, StyleSheet } from 'react-native';

const Indicators = ({ indicatorCount, currentSlideIndex }) => {
  if (!indicatorCount || typeof indicatorCount !== 'number') return null;

  let indicators = [];
  for (let i = 0; i < indicatorCount; i++) {
    indicators.push(i);
  }
  
  return indicators.map((indicator, index) => (
    <View
      key={indicator.toString()}
      style={[
        styles.indicator,
        index === currentSlideIndex ? styles.selected : styles.unSelected,
      ]}
    />
  ));
};

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: '#f1e22e',
    width: 25,
    height: 8,
  },
  unSelected: {
    backgroundColor: 'transparent',
    backgroundColor:"#C4C4C4"
  },
});

export default Indicators;
