import React from "react";

const AdminForm = ({ id: key, majRecette, recettes, supprimerRecette }) => {
  const recette = recettes[key];
  const handleChange = (event, key) => {
    const { name, value } = event.target;
    const recette = recettes[key];
    recette[name] = value;
    majRecette(key, recette);
  };
  return (
    <div className='card'>
      <form className='admin-form'>
        <input
          type='text'
          onChange={e => handleChange(e, key)}
          value={recette.nom}
          name='nom'
          placeholder='Nom de la recette'
        />
        <input
          type='text'
          onChange={e => handleChange(e, key)}
          value={recette.image}
          nom='image'
          placeholder="Adresse de l'image"
        />
        <textarea
          onChange={e => handleChange(e, key)}
          value={recette.ingredients}
          name='ingredients'
          rows='3'
          placeholder='Liste des ingrédients'
        />
        <textarea
          onChange={e => handleChange(e, key)}
          value={recette.instructions}
          name='instructions'
          placeholder='instructions'
          rows='15'
        />
      </form>
      <button onClick={() => supprimerRecette(key)}>Supprimer</button>
    </div>
  );
};

export default AdminForm;
