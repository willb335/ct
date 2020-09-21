import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { csv } from 'd3-fetch';
import { DSVRowArray, DSVRowString } from 'd3-dsv';
import { scaleQuantile } from 'd3-scale';

import { CT } from './CT';
import { Scale } from './Scale';
import { ScaleTooltip } from './ScaleTooltip';
import { CTTooltip } from './CTTooltip';

export interface CurrentTownData {
  [key: string]: string;
}

export interface TownFill {
  name: string;
  fill: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const App: FunctionComponent = () => {
  const [currentTown, setCurrentTown] = useState<CurrentTownData | null>(null);
  const [currentScale, setCurrentScale] = useState<string | null>(null);
  const [data, setData] = useState<DSVRowString[]>([]);
  const [townFills, setTownFills] = useState<TownFill[]>([]);

  useEffect(() => {
    // https://data.ct.gov/Tax-and-Revenue/Personal-Income-Tax-By-Town/pvqv-e235
    csv(`${process.env.PUBLIC_URL}/Personal_Income_Tax_By_Town.csv`).then(
      (towns: DSVRowArray<string>): void => {
        const filtered: DSVRowString[] = towns?.filter(
          (d) => d['Tax Year'] === '2017'
        );

        setData(filtered);
      }
    );
  }, []);

  const colorScale = scaleQuantile<string>()
    .domain(
      data
        .filter((town) => town['Tax Per Capita'] !== undefined)
        .map((town) => {
          if (town['Tax Per Capita'] === undefined) {
            return undefined;
          }
          return parseFloat(town['Tax Per Capita'].replace(/,/g, ''));
        })
    )
    .range([
      '#BF1E06',
      '#DF3F1A',
      '#F16334',
      '#F28750',
      '#F3A66C',
      '#F5C187',
      '#F6D6A2',
      '#F9E7BD',
      '#FBF4D8',
    ]);

  useEffect(() => {
    const fillsArray = data
      .filter((town): boolean => town['Tax Per Capita'] !== undefined)
      .map(
        (town): TownFill => {
          return {
            name: town['Municipality'] ? formatTown(town['Municipality']) : '',
            fill: town['Tax Per Capita']
              ? colorScale(parseFloat(town['Tax Per Capita'].replace(/,/g, '')))
              : '#EEE',
          };
        }
      );

    setTownFills(fillsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const formatTown = (string: string): string => {
    const lowerCased = string.toLowerCase();
    return lowerCased
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  };

  return (
    <>
      <Container>
        <h3>2017 Connecticut Personal Income Tax by Town</h3>
      </Container>
      <CT data={data} colorScale={colorScale} setCurrentTown={setCurrentTown} />

      {currentTown && (
        <ReactTooltip data-for="ct">
          <CTTooltip currentTown={currentTown} formatTown={formatTown} />
        </ReactTooltip>
      )}

      <Container>
        {currentScale && (
          <ReactTooltip data-for="scale">
            <ScaleTooltip townFills={townFills} currentScale={currentScale} />
          </ReactTooltip>
        )}
        <Scale setCurrentScale={setCurrentScale} />
      </Container>
    </>
  );
};
