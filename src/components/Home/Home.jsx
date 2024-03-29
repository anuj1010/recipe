import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import Axios from "axios";
import RecipeTile from "../RecipeTile/RecipeTile";
import img1 from "../Assets/1.jpg";
import img2 from "../Assets/2.jpg";
import img3 from "../Assets/3.jpg";
import img4 from "../Assets/4.jpg";

const Home = () => {
  const [ingridient, setIngridient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeHeading, setRecipeHeading] = useState(false);
  const [homeDisplay, setHomeDisplay] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorite"));
    if (data) {
      setFavorite(data);
    }
  }, []);

  const appId = "93f08e6c";
  const appKey = "845926c2891a96f161565fa47ade63f0";

  var url = `https://api.edamam.com/search?q=${ingridient}&app_id=${appId}&app_key=${appKey}&from=0&to=30&health=alcohol-free`;
  var homeUrl = `https://api.edamam.com/search?q=paneer&app_id=${appId}&app_key=${appKey}&from=0&to=15&health=alcohol-free`;

  async function getRecipe() {
    const recipe = await Axios.get(url);
    setRecipes(recipe.data.hits);
    console.log(recipe.data.hits);
  }
  useEffect(() => {
    async function homeRecipe() {
      const result = await Axios.get(homeUrl);
      const homeresult = result.data.hits;
      setHomeDisplay(homeresult);
    }
    homeRecipe();
  }, [homeUrl]);

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipe();
    setRecipeHeading(true);
  };

  const show = (val) => {
    setFavorite((old) => {
      return [...old, val];
    });
  };

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  });

  //    useEffect(()=>{
  //     const data = JSON.parse(localStorage.getItem('favorite'));
  //     setFavorite(data);
  //    },[favorite]);

  // homeRecipe();

  return (
    <>
      <div className="app">
        <div className="search_container">
          <p className="search_tagline">The variety on your plate...</p>

          <form className="search_form" onSubmit={onSubmit}>
            <p className="search_heading">Search your Recipe</p>
            <div className="inputContainer">
              <input
                className="searchInput"
                type="text"
                placeholder="Enter ingridient"
                value={ingridient}
                onChange={(e) => {
                  setIngridient(e.target.value);
                }}
              />
              <input className="search_button" type="submit" value="Search" />
            </div>
          </form>
        </div>

        <div className="banner_container">
          <div className="banner">
            <img className="banner_img" src={img1} alt="icon" target="_blank" />
          </div>
          <div className="banner">
            <img className="banner_img" src={img2} alt="icon" target="_blank" />
          </div>
          <div className="banner">
            <img className="banner_img" src={img3} alt="icon" target="_blank" />
          </div>
          <div className="banner">
            <img className="banner_img" src={img4} alt="icon" target="_blank" />
          </div>
        </div>

        {recipeHeading ? (
          <div className="recipe_heading">
            All Recipes related to {ingridient} are shown below.
          </div>
        ) : (
          <div className="displayNone"></div>
        )}
        <div className="recipe_container">
          {recipes.map((recipe, indx) => {
            return (
              <RecipeTile
                recipe={recipe}
                key={indx}
                show={show}
                favorite={favorite}
              />
            );
          })}
        </div>
        <div className="home_container">
          <p className="home_heading">
            Where our expertise is still a family tradition.
          </p>
          <div className="recipe_container">
            {homeDisplay.map((recipe, indx) => {
              return (
                <RecipeTile
                  recipe={recipe}
                  key={indx}
                  show={show}
                  favorite={favorite}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
