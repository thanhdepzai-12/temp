import React, { useContext } from 'react'
import { SketchPicker } from 'react-color';
import { ColorContext } from '../../../Context/GlobalContext';

const Color = () => {

      const { setColor } = useContext(ColorContext);
      const hanldeChangeColor = (color) => {
        if (color) {
          setColor(color);
        }
      };
  return (
      <div>
          <SketchPicker
          onChangeComplete={hanldeChangeColor}
          />
    </div>
  )
}

export default Color