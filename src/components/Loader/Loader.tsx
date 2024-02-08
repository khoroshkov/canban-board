import React from "react";
import Skeleton from "react-loading-skeleton";

import { arrayRange } from "src/utils/arrayRange";
import { stagesNames } from "src/models/stages";

import "react-loading-skeleton/dist/skeleton.css";

export const Loader = () => {
  return (
    <div className="mt-50 layout-row">
      {arrayRange(1, stagesNames.length).map((i: number) => (
        <div className="card outlined ml-20 mt-0" key={`${i}`}>
          <div className="card-text">
            <Skeleton />
            <div className="styled mt-50">
              <Skeleton count={5} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
