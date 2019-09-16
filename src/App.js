//Caue Candia Sampaio RA 816154566 Professor César
//Merhy Omar Daychoum RA 816110728 Professor César

import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      newValue: {
        x: 0,
        y: 0
      },
      lines: [],
      block: false
    };
    this.handleNewLine = this.handleNewLine.bind(this);
    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChangeY = this.handleChangeY.bind(this);
    this.drawLines = this.drawLines.bind(this);
  }

  handleChangeX(e) {
    this.setState({
      newValue: { ...this.state.newValue, x: e.target.value - 0 }
    });
  }

  handleChangeY(e) {
    this.setState({
      newValue: { ...this.state.newValue, y: e.target.value - 0 }
    });
  }

  handleNewLine(e) {
    e.preventDefault();
    const { lines, newValue } = this.state;
    lines.push(newValue);
    this.setState(prevState => ({
      ...prevState,
      x: prevState.x + 1,
      y: prevState.y + 1,
      newValue: {
        x: 0,
        y: 0
      }
    }));
  }

  drawLines(e) {
    e.preventDefault();
    const { lines } = this.state;

    for (let i = 0; i < lines.length - 1; i++) {
      console.log(i);
      this.algorithm(lines[i].x, lines[i].y, lines[i + 1].x, lines[i + 1].y);
    }
    this.setState({
      block: true
    });
  }

  //retorna um numero positivo
  abs(number) {
    if (number < 0) return number * -1;
    return number;
  }

  //arredonda o número
  round(number) {
    return parseInt(number + 0.5);
  }

  drawPixel(x, y) {
    const canvas = document.querySelector(".drawer");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(225,225,225,0.7)";
    ctx.fill();
    ctx.closePath();
  }

  algorithm(x1, y1, x2, y2) {
    //calcula a inclinação
    var dx = x2 - x1;
    var dy = y2 - y1;

    //verifica para qual eixo a reta está mais próxima
    if (this.abs(dx) >= this.abs(dy)) var steps = this.abs(dx);
    else var steps = this.abs(dy);

    this.drawPixel(this.round(x1), this.round(y1)); //desenha um pixel na tela

    for (var i = 1; i <= steps; i++) {
      x1 = x1 + dx / steps;
      y1 = y1 + dy / steps;
      this.drawPixel(this.round(x1), this.round(y1));
    }
  }

  reload() {
    window.location.reload();
  }

  render() {
    const { x, y, newValue, lines, block } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h3>Desenhe na tela</h3>
          <p>
            Instruções: No menu abaixo adicione os pontos em conjunto (x, y)
            para traçarmos as retas. Você pode adicionar quantos pontos quiser.
            Pelo menos dois pontos são necessários para que a reta seja traçada.
            Adicione mais pontos clicando no botão "Adicionar" abaixo. Ao
            adicionar as retas desejadas clique em "Desenhar". Para repetir o
            processo, cliquem em "Inicio".
          </p>
          <h2>
            Atenção, digite ambos os valores de X e Y, os Inputs não estão sendo
            limpos automaticamente, ou seja, ao adicionar uma reta, os valores
            continuam aparecendo, porém o valor deles é 0
          </h2>
        </header>
        <canvas className="drawer" />
        <div className="menu">
          <form className="new-line-form">
            <div className="new-line-form-field">
              <label className="new-value-label">X{x}</label>
              <input
                type="number"
                defaultValue={newValue.x}
                className="new-value-input"
                onChange={this.handleChangeX}
              />
            </div>
            <div className="new-line-form-field">
              <label className="new-value-label">Y{y}</label>
              <input
                type="number"
                defaultValue={newValue.y}
                className="new-value-input"
                onChange={this.handleChangeY}
              />
            </div>
            <div className="new-line-form-field baseline">
              <button
                onClick={this.handleNewLine}
                className="new-value-button"
                disabled={block}
              >
                Adicionar linha
              </button>
            </div>
            <div className="new-line-form-field baseline">
              <button
                onClick={this.drawLines}
                className="new-value-button run"
                disabled={lines.length < 2}
              >
                Desenhar
              </button>
            </div>
            <div className="new-line-form-field baseline">
              <button onClick={this.reload} className="new-value-button">
                Inicio
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
