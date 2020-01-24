import React, { Component } from 'react';

class Square extends Component{
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()} >{this.props.value}</button>
        )
    }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      square: Array(9).fill(null),
      xIsNext: false,
      win: false,
      winner: null,
      nextPlayer: false,
      history: [],
      count: 0,
      final_square: [],
      final_xIsNext: null,
    };
  }

  nextPlayer = () => {
    return this.state.xIsNext ? "X" : "O";
  };

  handleClick = i => {
    const { winner } = this.state;

    if (winner === "X" || winner === "O") {
      return;
    }
    const square = this.state.square.slice();
    const history = [];
    history.push(square);

    if (square[i] === "X" || square[i] === "O") {
      return null;
    } else {
      //   const square = this.state.square.slice();

      const newArray = this.state.square;
      const xIsNext = this.state.xIsNext;
      const newObj = {
        newArray,
        xIsNext
      };

      square[i] = this.state.xIsNext ? "X" : "O";
      console.warn("square[i] : ", square[i]);
      this.setState(
        {
          square: square,
          final_square: square,
          xIsNext: !this.state.xIsNext,
          final_xIsNext: !this.state.xIsNext,
          history: [...this.state.history].concat(newObj),
          count: this.state.count + 1
        }
      );
    }
  };

  ArrayCheck = () => {
    if (!this.state.square.includes(null) && this.state.winner === null) {
      this.setState({ nextPlayer: true });
    }
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.square != this.state.square) {
      this.setState(
        {
          winner: this.winnerSelector(nextState.square)
        },
        () => this.ArrayCheck()
      );
    }
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) { };

  winnerSelector(square) {
    const lines = [
      [0, 1, 2], // h-1
      [3, 4, 5], // h-2
      [6, 7, 8], // h-3
      [0, 4, 8], // lt-rb-4
      [2, 4, 6], // rt-lb-5
      [1, 4, 7], // v-2
      [2, 5, 8], // v-3
      [0, 3, 6] // v-1
    ];
    for (var i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  reduceSquare(i) {
    return (
      <Square
        value={this.state.square[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  goToMove(val) {
    this.setState(
      {
        square: this.state.history[val].newArray,
        xIsNext: this.state.history[val].xIsNext,
        nextPlayer: false
      }
    );
  }

  handleFinalMove() {
    this.setState({
      square: this.state.final_square,
      xIsNext: this.state.final_xIsNext
    });
  }

  render() {
    const nextPlayer = this.state.xIsNext ? "X" : "O";
    const { winner} = this.state;

    return (
      <>
        <div className="board">
          {this.reduceSquare(0)}
          {this.reduceSquare(1)}
          {this.reduceSquare(2)}
          {this.reduceSquare(3)}
          {this.reduceSquare(4)}
          {this.reduceSquare(5)}
          {this.reduceSquare(6)}
          {this.reduceSquare(7)}
          {this.reduceSquare(8)}
        </div>
        <br />
        {this.state.nextPlayer
          ? "Nobody won as no turn left behind"
          : winner
          ? `winner is ${winner}`
          : `Next Player is = ${nextPlayer}`}
        <br />
        <br />
        <h1>History Section</h1>
        <br />

        {this.state.history.map((val, index) => (
          <>
            <button key={index} onClick={() => this.goToMove(index)}>
              Move # {index}
            </button>
            <br />
          </>
        ))}
        {this.state.history && this.state.history.length > 0 ? (
          <button
            onClick={() => {
              this.handleFinalMove();
            }}
          >
            Final Move
          </button>
        ) : null}
      </>
    );
  }
}

class TicTak extends Component{
    render() {
        return (
            <div>
                <h1>This is a TikTak Game!</h1>
                <br />
                <Board/>
            </div>
        )
    }
}

export default TicTak;

