import React, { Component } from "react";
import AjouterRecette from "./AjouterRecette";
import AdminForm from "./AdminForm";
import Login from "./Login";
import firebase from "firebase/app";
import "firebase/auth";
import base, { firebaseApp } from "../base";

class Admin extends Component {
  state = {
    uid: null,
    chef: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleAuth({ user });
      }
    });
  }

  handleAuth = async authData => {
    const { pseudo } = this.props;
    const box = await base.fetch(pseudo, { context: this });
    if (!box.chef) {
      await base.post(`${pseudo}/chef`, { data: authData.user.uid });
    }
    this.setState({ uid: authData.user.uid, chef: box.chef || authData.user.uid });
  };

  authenticate = () => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuth);
  };

  logout = async () => {
    console.log("Déconnexion");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const { ajouterRecette, recettes, chargerExemple, majRecette, supprimerRecette } = this.props;
    const { uid, chef } = this.state;
    const logout = <button onClick={this.logout}>Déconnexion</button>;
    if (!uid) {
      return <Login authenticate={this.authenticate} />;
    }
    if (uid !== chef) {
      return (
        <div>
          <p>Tu n'es pas le chef de cette boîte</p>
          {logout}
        </div>
      );
    }
    return (
      <div className='cards'>
        <AjouterRecette ajouterRecette={ajouterRecette} />
        {Object.keys(recettes).map(key => (
          <AdminForm
            majRecette={majRecette}
            supprimerRecette={supprimerRecette}
            recettes={recettes}
            key={key}
            id={key}></AdminForm>
        ))}
        <footer>
          {logout}
          <button onClick={chargerExemple}>Remplir</button>
        </footer>
      </div>
    );
  }
}

export default Admin;
