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
  height: auto;
  max-height: auto;
  outline: 1px solid #303030;

  @media (max-width: 1200px) {
    height: 50px;
    max-height: ${(props) => `${props.size / range.length - 1}px`};
  }
`;

const StyledScale = styled.div<{ size: number; fill: string }>`
  display: block;
  width: 50px;
  height: 50px;
  max-width: ${(props) => `${(props.size / range.length - 1) * 0.9}px`};
  max-height: ${(props) => `${props.size / range.length - 1}px`};
  background-color: ${(props) => props.fill};

  @media (max-width: 1200px) {
    display: inline-block;
  }
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
