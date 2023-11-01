import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  // foodsToDisplay is a new variable created for the filter feature
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  // the handleFilterChange function handles filtering what is displayed
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }
  

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
    console.log(newFood);
  }

  /*function handleClick(id){
    // removes clicked food item from list
    const newFoodArray = foods.filter((food) => food.id !== id);
    setFoods(newFoodArray);
  }*/

  function handleLiClick(id) {
    // increments heat level of clicked food item
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  // foodlist is used as it is below before the filter feature is introduced
  /*const foodList = foods.map((food) => (
    <li key={food.id} onClick={() => {
      handleClick(food.id);
      handleLiClick(food.id);
      }} >
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));*/

    // foodlist is used as it is below after the filter feature is introduced
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <>
    <select name="filter" onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="American">American</option>
      <option value="Sichuan">Sichuan</option>
      <option value="Thai">Thai</option>
      <option value="Mexican">Mexican</option>
    </select>

    <button onClick={handleAddFood}>Add New Food</button>
    <ul>{foodList}</ul>
    </>
  );
  /*return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );*/
}

export default SpicyFoodList;
