import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface ScaleProps {
  setCurrentScale: Function;
}

const range = [
  '#BF1E06',
  '#DF3F1A',
  '#F16334',
  '#F28750',
  '#F3A66C',
  '#F5C187',
  '#F6D6A2',
  '#F9E7BD',
  '#FBF4D8',
].reverse();

const ScaleContainer = styled.div<{ size: number }>`
  position: relative;
  display: block;
  background: #dcdcdc;
  height: ${(props) => `${props.size / range.length - 1}px`};
`;

const StyledScale = styled.div<{ size: number; fill: string }>`
  display: inline-block;
  width: ${(props) => `${(props.size / range.length - 1) * 0.9}px`};
  height: ${(props) => `${props.size / range.length - 1}px`};
  background-color: ${(props) => props.fill};
`;

export const Scale: FunctionComponent<ScaleProps> = ({ setCurrentScale }) => {
  return (
    <ScaleContainer data-tip="" id="scale" size={window.innerWidth}>
      {range.map((fill, i) => {
        return (
          <StyledScale
            fill={fill}
            size={window.innerWidth}
            key={fill + i}
            onMouseEnter={() => setCurrentScale(fill)}
            onMouseLeave={() => setCurrentScale(null)}
          ></StyledScale>
        );
      })}
    </ScaleContainer>
  );
};
