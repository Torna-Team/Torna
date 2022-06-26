import { Layer, Text } from 'react-konva';

function Texts({ text, handleDragEnd, canvaElements }: any) {
  return (
    <>
      <Layer>
        {text &&
          text.map((el: any) => {
            return (
              <Text
                //onClick function here that opens edit menu
                x={el.x ? el.x : window.innerWidth / 2}
                y={el.y ? el.y : window.innerHeight / 2}
                text={el.text}
                fontSize={30}
                fill={el.color}
                draggable
                key={el.id}
                id={el.id.toString()}
                onDragEnd={(e) => {
                  console.log('text event', e.target);
                  console.log('textoooooo', el);
                  const indx = handleDragEnd(el);
                  console.log(indx, canvaElements, canvaElements[indx]);
                  canvaElements[indx].x = e.target.x();
                  canvaElements[indx].y = e.target.y();
                }}
              />
            );
          })}
      </Layer>
    </>
  );
}

export default Texts;
