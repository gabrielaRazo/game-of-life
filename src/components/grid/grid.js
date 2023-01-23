import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './grid.css';

const Grid = () => {
  const numRows = 30;
  const numCols = 30;
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

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
    // Toggle the cell between "alive" and "dead"
    newGrid[i][j] = grid[i][j] === 1 ? 0 : 1;
    setGrid(newGrid);
  };

  useEffect(() => {
    onEmptyGrid();
  }, []);

  const updateGrid = (grid) => {
    if (!runningRef.current) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let aliveNeighbors = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue; //current cell does not change its state
            if (i + x < 0 || j + y < 0) continue; //check if the indexes are not negative
            if (i + x >= grid.length || j + y >= grid[0].length) continue; //check if the indexes are not greater than the grid itself

            if (grid[i + x][j + y] === 1) {
              //check if the cell is alive
              aliveNeighbors++;
            }
          }
        }
        //rules for the game of life
        if (grid[i][j] === 1) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            //cell dies
            newGrid[i][j] = 0;
          }
        } else {
          if (aliveNeighbors === 3) {
            //cell comes to life
            newGrid[i][j] = 1;
          }
        }
      }
    }
    const checkNewGrid = newGrid.every((row) =>
      row.every((cell) => cell === 0)
    );
    console.log('checkNewGrid', checkNewGrid);
    if (checkNewGrid) {
      setRunning(false);
    }
    return newGrid;
  };

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => {
        setGrid(updateGrid);
      }, 500);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [running, setGrid, updateGrid]);

  return (
    <Container>
      <Row>
        <div className="space" />
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
          <div className="space" />
          <Stack direction="horizontal" gap={3}>
            <Button
              variant="outline-secondary"
              onClick={() => setRunning(!running)}
            >
              {running ? 'Stop' : 'Start'}
            </Button>
            <Button variant="outline-secondary" onClick={() => onEmptyGrid()}>
              Restart
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setGrid(randomGrid())}
            >
              Random
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Grid;
