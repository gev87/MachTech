/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const BoardVisualization = ({ boardWidth, boardHeight, boards }) => {
  console.log("board");
  const scale = 0.2;
  const totalHeight = boards.length * boardHeight * scale + 20;

  return (
    <div>
      <Stage width={boardWidth * scale + 30} height={totalHeight}>
        <Layer x={20} y={20}>
          {boards.map((board, boardIndex) => (
            <React.Fragment key={boardIndex}>
              <Rect
                x={0}
                y={boardHeight * scale * boardIndex}
                width={boardWidth * scale}
                height={boardHeight * scale}
                fill="#FFE4C4"
                stroke="black"
                strokeWidth={2}
              />
              {board.slices.map((slice, index) => (
                <React.Fragment key={index}>
                  <Rect
                    x={slice.x * scale}
                    y={(slice.y + boardHeight * boardIndex) * scale}
                    width={slice.width * scale}
                    height={slice.height * scale}
                    fill="rgba(163, 124, 77, 0.7)"
                    stroke="gray"
                    strokeWidth={2}
                    cornerRadius={10}
                    shadowColor="black" 
                    shadowBlur={5}
                  />
                  <Text
                    x={slice.x * scale}
                    y={(slice.y + boardHeight * boardIndex) * scale}
                    text={`${slice.width}x${slice.height}`}
                    fontSize={12}
                    fill="white"
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default React.memo(BoardVisualization);

