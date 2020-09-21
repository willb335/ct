import React, { FunctionComponent } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { DSVRowString } from 'd3-dsv';
import styled from 'styled-components';

import towns from './ct.geo.json';

interface CTProps {
  setCurrentTown: Function;
  data: DSVRowString[];
  colorScale: Function;
}

const RotatedComposableMap = styled(ComposableMap)`
  transform: rotate(11deg);
`;

export const CT: FunctionComponent<CTProps> = ({
  setCurrentTown,
  data,
  colorScale,
}) => {
  return (
    <RotatedComposableMap
      id="ct"
      data-tip=""
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 820 }}
      viewBox="634 219 36 20"
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
      strokeWidth=".005"
    >
      <Geographies geography={towns.features}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const cur = data.find(
              (town) =>
                town['Municipality'] === geo.properties.town.toUpperCase()
            );

            return (
              <Geography
                key={geo.rsmKey}
                onMouseEnter={() => cur && setCurrentTown(cur)}
                onMouseLeave={() => setCurrentTown(null)}
                geography={geo}
                fill={
                  cur && cur['Tax Per Capita']
                    ? colorScale(
                        parseFloat(cur['Tax Per Capita'].replace(/,/g, ''))
                      )
                    : '#EEE'
                }
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: 'gainsboro' },
                  pressed: { outline: 'none' },
                }}
                tabIndex={-1}
              />
            );
          })
        }
      </Geographies>
    </RotatedComposableMap>
  );
};
