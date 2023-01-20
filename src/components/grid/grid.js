import React, { useState, useEffect } from 'react';
import './grid.css';

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [numCols, setNumCols] = useState(30);
  const [numRows, setNumRows] = useState(30);

  const onEmptyGrid = () => {
    var grid = [];
    for (var i = 0; i < numRows; i++) {
      grid.push(new Array(numCols).fill(0));
    }
    setGrid(grid);
  };

  useEffect(() => {
    onEmptyGrid();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {grid &&
          grid.map((rows, i) =>
            rows.map((cols, j) => (
              <div
                className="tableStyle"
                style={{ backgroundColor: grid[i][j] ? 'pink' : 'white' }}
              />
            ))
          )}
      </div>
    </div>
  );
};

export default Grid;
