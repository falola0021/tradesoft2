import React, {useState} from 'react';
import {Text, StyleSheet,TextInput, Touchable, TouchableOpacity} from 'react-native';

import {
  CodeField,
  
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  // codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
     alignItems:'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#0130B0',
    textAlign: 'center',
    color:"#0130B0",
    borderRadius:5,
    fontFamily: 'Nunito_600SemiBold',
  },
  focusCell: {
    borderColor: 'green',
  },
});


const CELL_COUNT = 6;

const App = ({value,setValue}) => {
 
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    
      
      <CodeField
        ref={ref}
        {...props}
       
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
         showSoftInputOnFocus={false}
         editable={false} 
         selectTextOnFocus={false}
         
      
        renderCell={({index, symbol, isFocused}) => (
          <TextInput
        
          password={true}
          secureTextEntry={true}
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </TextInput>
        )}
       
      />
   
  );
};

export default App;