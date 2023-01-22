import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  console.log('grid', grid);

  const randomGrid = () => {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      grid.push(row);
    }
    return grid;
  };

  const onColorCell = (i, j) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    console.log('newGrid', newGrid);
    // Toggle the cell between "alive" and "dead"
    newGrid[i][j] = grid[i][j] === 1 ? 0 : 1;
    setGrid(newGrid);
  };

  useEffect(() => {
    onEmptyGrid();
    //setGrid(randomGrid());
  }, []);

  return (
    <Container>
      <Row>
        <Col
          lg={{ span: 6, offset: 3 }}
          md={{ span: 6, offset: 1 }}
          xs={{ span: 12, offset: 0 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${numCols}, 20px)`,
            }}
          >
            {grid &&
              grid.map((rows, i) =>
                rows.map((cols, j) => (
                  <>
                    <div
                      key={`${i}-${j}`}
                      onClick={() => onColorCell(i, j)}
                      style={{
                        width: 20,
                        height: 20,
                        border: '1px solid black',
                        backgroundColor: grid[i][j] ? 'red' : 'white',
                      }}
                    />
                  </>
                ))
              )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Grid;
