import React, { FunctionComponent } from 'react';
import { TownFill } from './App';

interface ScaleTooltipProps {
  townFills: TownFill[];
  currentScale: string;
}

export const ScaleTooltip: FunctionComponent<ScaleTooltipProps> = ({
  townFills,
  currentScale,
}) => {
  return (
    <div>
      {townFills
        .filter((town) => town.fill === currentScale)
        .map((town) => (
          <div key={town.name}>{town.name}</div>
        ))}
    </div>
  );
};
