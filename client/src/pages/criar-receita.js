import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

function CriarReceita() {
  const userID = useGetUserID();

  const [receita, setReceita] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReceita({ ...receita, [name]: value });
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...receita.ingredients];
    newIngredients[index] = event.target.value;
    setReceita({ ...receita, ingredients: newIngredients });
  };

  const adicionarIngrediente = (event) => {
    event.preventDefault();
    setReceita({ ...receita, ingredients: [...receita.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/receitas", receita);

      alert("Receita criada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="criar-receita">
      <h2> Criar Nova Receita</h2>
      <form>
        <label htmlFor="title">Nome:</label>
        <br />
        <input type="text" id="title" name="title" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="ingredients">Ingredientes:</label>
        <br />
        {receita.ingredients.map((ingrediente, index) => (
          <input
            key={index}
            type="text"
            id={`ingredient-${index}`}
            name="ingredients"
            value={ingrediente}
            onChange={(e) => handleIngredientChange(index, e)}
          />
        ))}
        <br />
        <button onClick={adicionarIngrediente} type="button">
          Incluir ingrediente
        </button>
        <br />
        <br />
        <label htmlFor="instructions">Instruções:</label>
        <br />
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="imageUrl">Imagem:</label>
        <br />
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="cookingTime">Tempo de Cocção:</label>
        <br />
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit" onClick={onSubmit}>Criar Nova Receita</button>
      </form>
    </div>
  );
}

export default CriarReceita;
