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

  useEffect(() => {
    onEmptyGrid();
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
                  <div
                    className="tableStyle"
                    style={{
                      backgroundColor: grid[i][j] ? 'pink' : 'white',
                    }}
                  />
                ))
              )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Grid;
