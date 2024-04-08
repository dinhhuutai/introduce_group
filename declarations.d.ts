/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */

declare module '*.svg' {
    import React from 'react';
    import {SvgProps} from 'react-native-svg';
    const content: React.FC<SvgProps>;
  
    export default content;
}