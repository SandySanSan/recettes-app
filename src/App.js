import React, { Component } from "react";
// CSS
import "./App.css";
import Header from "./components/Header";
import recettes from "./recettes";
import Admin from "./components/Admin";
import Card from "./components/Card";
// Firebase
import base from "./base";

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  };

  componentDidMount() {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: "recettes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  ajouterRecette = recette => {
    const recettes = { ...this.state.recettes };
    recettes[`recettes-${Date.now()}`] = recette;
    this.setState({ recettes });
  };

  majRecette = (key, newRecette) => {
    const recettes = { ...this.state.recettes };
    recettes[key] = newRecette;
    this.setState({ recettes });
  };

  supprimerRecette = key => {
    const recettes = { ...this.state.recettes };
    recettes[key] = null;
    this.setState({ recettes });
  };

  chargerExemple = () => this.setState({ recettes });

  render() {
    const { recettes, pseudo } = this.state;
    const cards = Object.keys(recettes).map(key => <Card key={key} details={recettes[key]} />);
    return (
      <div className='box'>
        <Header pseudo={pseudo} />
        <div className='cards'>
          <div className='card'>{cards}</div>
        </div>
        <Admin
          pseudo={pseudo}
          ajouterRecette={this.ajouterRecette}
          chargerExemple={this.chargerExemple}
          majRecette={this.majRecette}
          recettes={recettes}
          supprimerRecette={this.supprimerRecette}
        />
      </div>
    );
  }
}

export default App;
