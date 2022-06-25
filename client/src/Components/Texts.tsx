import React from 'react';
//import { useState } from 'react';
import { Layer, Text } from 'react-konva';

function Texts({ text }: any) {
  return (
    <>
      <Layer>
        {text &&
          text.map((el: any) => {
            return (
              <Text text={el} fontSize={20} draggable onClick={() => {}} />
            );
          })}
      </Layer>
    </>
  );
}

export default Texts;
