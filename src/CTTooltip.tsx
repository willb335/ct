import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { CurrentTownData } from './App';

interface CTTooltipProps {
  currentTown: CurrentTownData;
  formatTown: Function;
}

const ToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  line-height: 0;
`;

export const CTTooltip: FunctionComponent<CTTooltipProps> = ({
  currentTown,
  formatTown,
}) => {
  return (
    <ToolTipContainer>
      <h4>{currentTown && formatTown(currentTown['Municipality'])}</h4>
      <p>Tax Per Capita: ${currentTown && currentTown['Tax Per Capita']}</p>
      <p>
        Number of Returns: {currentTown && currentTown['Number of Returns']}
      </p>
      <p style={{ paddingBottom: 7 }}>
        Total Taxes Paid: ${currentTown && currentTown['CT Income Tax']}
      </p>
    </ToolTipContainer>
  );
};
