const mockRecipe = {
    RecipeID: 4,
    RecipeTitle: "Italian Sausage and Bread Stuffing",
    RecipeDescription: null,
    RecipeInstructions: "Preheat oven to 350°F...",
    ImageURL: "italian-sausage-and-bread-stuffing-240559",
    AverageRating: null,
    SkillLevel: "Intermediate",
    yield: null,
    Ingredients: "coarsely chopped flatleaf parsley - 0.50 cup,garlic - 5.00 cloves",
    Themes: "Breakfast,Comfort Food,Holiday Meals,Picnic & BBQ",
    Labels: "Dairy,Dessert,Herbs & Spices",
    Reviews: null,
  };
  
  const RecipeDetailPage = () => {
    const recipe = mockRecipe;
  
    return (
      <div>
        <h1>{recipe.RecipeTitle}</h1>
      </div>
    );
  };
  
  export default RecipeDetailPage;
  