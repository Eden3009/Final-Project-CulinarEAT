import React, { useState } from 'react';
import styled from 'styled-components';


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #e9e4e0 0%, #f3ece8 100%);
  font-family: 'Raleway', sans-serif;
`;

const Form = styled.form`
  width: 100%;
  max-width: 780px;
  padding: 30px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(200, 200, 200, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-family: 'EB Garamond', serif;
  color: #333;
  font-size: 26px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
  height: 18px;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const ErrorBubble = styled.div`
  background-color: #e74c3c;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  white-space: nowrap;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #e74c3c;
  }
`;

const Input = styled.input`
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid ${({ isError }) => (isError ? '#e74c3c' : 'rgba(0, 0, 0, 0.2)')};
  font-size: 16px;
  background-color: #fefefe;
  font-family: 'Raleway', sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;

  &:focus {
    border-color: #5b9e5d;
    box-shadow: 0px 0px 8px rgba(92, 158, 93, 0.3);
    outline: none;
  }
`;


const FullWidthTextarea = styled.textarea`
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 16px;
  width: 100%;
  background-color: #fefefe;
  font-family: 'Raleway', sans-serif;
  resize: vertical;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  &:focus {
    border-color: #5b9e5d;
    box-shadow: 0px 0px 8px rgba(92, 158, 93, 0.3);
    outline: none;
  }
`;

const IngredientGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const SmallInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`;

const SmallInput = styled(Input)`
  width: 100%;
`;

const Select = styled.select`
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 16px;
  width: 35%;
  background-color: #fefefe;
  font-family: 'Raleway', sans-serif;
  transition: border-color 0.3s;
  box-sizing: border-box;
  &:focus {
    border-color: #5b9e5d;
    outline: none;
  }
`;

const Button = styled.button`
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  color: #FFFFFF;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    transform: translateY(-3px);
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff5c5c;
  width: 80px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e64545;
  }
  &::before {
    content: '-';
    margin-right: 5px;
  }
`;

const AddButton = styled(Button)`
  background-color: #5b9e5d;
  &:hover {
    background-color: #4a8c50;
  }
  margin-bottom: 25px;
`;

const SubstituteButton = styled(Button)`
  background-color: #f0a202;
  &:hover {
    background-color: #e68a00;
  }
  width: auto;
`;


const CameraButton = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 32px;
  color: #333;
  background-color: #fff;
  transition: transform 0.3s, background-color 0.3s;
  &:hover {
    transform: scale(1.05);
    background-color: #f0f0f0;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled(Button)`
  background-color: #8B5E3C;
  &:hover {
    background-color: #70462c;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const Tag = styled.div`
  padding: 8px 12px;
  border-radius: 15px;
  background-color: #f0a202;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: #e68a00;
  }
`;

const Icon = styled.span`
  font-size: 14px;
`;

const SelectedTagsContainer = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 15px;
  min-height: 50px;
  background-color: #f9f9f9;
`;

const SelectedTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 15px;
  background-color: #5b9e5d;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
`;

const CategoryOption = styled.div`
  padding: 8px 16px;
  border-radius: 10px;
  background-color: #d1e8e2;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid #8B5E3C;
  &:hover {
    background-color: #b2d2ca;
  }
  &.selected {
    background-color: #8B5E3C;
    color: #fff;
  }
`;


const AddRecipePage = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ quantity: "", measure: "", name: "", substitute: "", showSubstitute: false }]);
  const [instructions, setInstructions] = useState([""]);
  const [errors, setErrors] = useState({});
  const [showAddStepError, setShowAddStepError] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [incompleteFields, setIncompleteFields] = useState({});
  const [productAmount, setProductAmount] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [preparationTime, setPreparationTime] = useState("");



  const isFormValid = () => {
    return (
      recipeName.trim().length >= 3 &&
      description.trim().length >= 10 &&
      ingredients.every(
        (ingredient) =>
          ingredient.quantity.trim() !== "" &&
          ingredient.name.trim() !== ""
      ) &&
      instructions.every((step) => step.trim().length >= 10)
    );
  };
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
  }
};

  const tags = [
    { label: "Kosher", icon: "🍞" },
    { label: "Not Kosher", icon: "🍖" },
    { label: "Dairy", icon: "🧀" },
    { label: "Meat", icon: "🥩" },
    { label: "Chicken", icon: "🍗" },
    { label: "Fish", icon: "🐟" },
    { label: "Desserts", icon: "🍰" },
    { label: "Vegan", icon: "🌱" },
    { label: "Vegetarian", icon: "🥕" },
    { label: "Nut Free", icon: "🥜" },
    { label: "Gluten Free", icon: "🌾" },
    { label: "Lactose Free", icon: "🥛" },
    { label: "Paleo", icon: "🥩" },
    { label: "Low Carb", icon: "🥦" },
    { label: "Low Fat", icon: "🍏" },
  ];

  const categories = [
    "Meals in 10 Minutes",
    "Holidays",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Meals for Date",
    "Kids' Meals",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
  ];
  

  const handleTagClick = (tag) => {
    if (!selectedTags.find((t) => t.label === tag.label)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };
  

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t.label !== tag.label));
  };

  const handleRecipeNameChange = (value) => {
    setRecipeName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      recipeName: value.length >= 3 || value === "" ? "" : "Recipe name must be at least 3 characters."
    }));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: value.length >= 10 || value === "" ? "" : "Description must be at least 10 characters."
    }));
  };

  const handleQuantityChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = value;
    setIngredients(newIngredients);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`ingredientQuantity${index}`]: /^\d+$/.test(value) || value === "" ? "" : "Quantity must be a number."
    }));
  };

  const handleIngredientNameChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = value;
    setIngredients(newIngredients);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`ingredientName${index}`]: /^[a-zA-Z\s]+$/.test(value) || value === "" ? "" : "Ingredient must contain only letters."
    }));
  };

  const handleStepChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`instruction${index}`]: value.length >= 10 || value === "" ? "" : "Each step must be at least 10 characters."
    }));
    setShowAddStepError(false); // Hide error bubble when user starts typing
  };

  const handleAddStep = () => {
    if (instructions.length === 0 || instructions[instructions.length - 1].length >= 10) {
      setInstructions([...instructions, ""]);
      setShowAddStepError(false);
    } else {
      setShowAddStepError(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Initialize an object to track incomplete fields
    const newIncompleteFields = {};
  
    // Check if recipeName is at least 3 characters
    if (recipeName.trim().length < 3) {
      newIncompleteFields.recipeName = true;
    }
  
    // Check if description is at least 10 characters
    if (description.trim().length < 10) {
      newIncompleteFields.description = true;
    }
  
    // Check if each ingredient has quantity and name filled in
    ingredients.forEach((ingredient, index) => {
      if (ingredient.quantity.trim() === "") {
        newIncompleteFields[`ingredientQuantity${index}`] = true;
      }
      if (ingredient.name.trim() === "") {
        newIncompleteFields[`ingredientName${index}`] = true;
      }
    });
  
    // Check if each instruction step has at least 10 characters
    instructions.forEach((step, index) => {
      if (step.trim().length < 10) {
        newIncompleteFields[`instruction${index}`] = true;
      }
    });
  
    // Update the incomplete fields state
    setIncompleteFields(newIncompleteFields);
  
    // If there are no incomplete fields, proceed with form submission
    if (Object.keys(newIncompleteFields).length === 0) {
      alert("Recipe submitted successfully!");
    } else {
      alert("Please fill out all fields correctly.");
    }
  };
  
  

  return (
    <PageWrapper>
      <Form onSubmit={handleFormSubmit}>
        <Title>Add a New Recipe</Title>

        {/* Recipe Name */}
        <FormGroup>
          <Label htmlFor="recipeName">Recipe Name</Label>
          <Input
  type="text"
  id="recipeName"
  placeholder="E.g., Grandma's Apple Pie"
  value={recipeName}
  onChange={(e) => handleRecipeNameChange(e.target.value)}
  isError={incompleteFields.recipeName}
  aria-label="Recipe name"
/>

          <ErrorText isVisible={!!errors.recipeName}>{errors.recipeName}</ErrorText>
        </FormGroup>

        {/* Description */}
        <FormGroup>
          <Label htmlFor="description">Description</Label>
         <FullWidthTextarea
  id="description"
  placeholder="Add a short description of the recipe"
  value={description}
  onChange={(e) => handleDescriptionChange(e.target.value)}
  isError={incompleteFields.description}
  aria-label="Recipe description"
/>

          <ErrorText isVisible={!!errors.description}>{errors.description}</ErrorText>
        </FormGroup>
{/* Amount of Product */}
<FormGroup>
  <Label htmlFor="productAmount">Amount of Product</Label>
  <Input
    type="text"
    id="productAmount"
    placeholder="E.g., 1 English Cake, 8 Pancakes"
    value={productAmount} // Create a state for productAmount if not already present
    onChange={(e) => setProductAmount(e.target.value)} // Create a handler if not already present
    aria-label="Final product amount"
  />
</FormGroup>
{/* Skill Level and Preparation Time*/}
<FormGroup style={{ display: "flex", gap: "20px", flexDirection: "row", alignItems: "center" }}>
  {/* Skill Level */}
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <Label htmlFor="skillLevel" style={{ marginBottom: "5px" }}>Skill Level</Label>
    <Select
      id="skillLevel"
      value={skillLevel}
      onChange={(e) => setSkillLevel(e.target.value)}
      aria-label="Select skill level"
      style={{ width: "100%", padding: "10px", fontSize: "16px" }} // set styles
    >
      <option value="">Select Level</option>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </Select>
  </div>

  {/* Preparation Time */}
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <Label htmlFor="preparationTime" style={{ marginBottom: "5px" }}>Preparation Time</Label>
    <Input
      type="text"
      id="preparationTime"
      placeholder="E.g., 20 minutes"
      value={preparationTime}
      onChange={(e) => setPreparationTime(e.target.value)}
      aria-label="Preparation time"
      style={{ width: "100%", padding: "10px", fontSize: "16px" }} // Ensure consistent styles
    />
  </div>
</FormGroup>


        {/* Ingredients */}
        <FormGroup>
          <Label>Ingredients</Label>
          {ingredients.map((ingredient, index) => (
            <IngredientGroup key={index}>
              <Row>
                <SmallInputContainer>
                  <SmallInput
                    type="text"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    aria-label={`Quantity for ingredient ${index + 1}`}
                  />
                  <ErrorText isVisible={!!errors[`ingredientQuantity${index}`]}>{errors[`ingredientQuantity${index}`]}</ErrorText>
                </SmallInputContainer>
                
                <Select
                  value={ingredient.measure}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].measure = e.target.value;
                    setIngredients(newIngredients);
                  }}
                >
                  <option value="">Select Measure</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="cup">Cup</option>
                  <option value="tbsp">Tbsp</option>
                  <option value="tsp">Tsp</option>
                </Select>

                <SmallInputContainer>
                  <SmallInput
                    type="text"
                    placeholder="Ingredient"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientNameChange(index, e.target.value)}
                    aria-label={`Ingredient name for ingredient ${index + 1}`}
                  />
                  <ErrorText isVisible={!!errors[`ingredientName${index}`]}>{errors[`ingredientName${index}`]}</ErrorText>
                </SmallInputContainer>
                
                <DeleteButton
                  type="button"
                  onClick={() => {
                    const newIngredients = ingredients.filter((_, i) => i !== index);
                    setIngredients(newIngredients);
                  }}
                >
                  Delete
                </DeleteButton>
              </Row>
              <SubstituteButton
                type="button"
                onClick={() => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].showSubstitute = !newIngredients[index].showSubstitute;
                  setIngredients(newIngredients);
                }}
              >
                {ingredient.showSubstitute ? "- Substitute" : "+ Substitute"}
              </SubstituteButton>
              {ingredient.showSubstitute && (
                <Input
                  type="text"
                  placeholder="Substitute Ingredient"
                  value={ingredient.substitute}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].substitute = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
              )}
            </IngredientGroup>
          ))}
          <AddButton
            type="button"
            onClick={() => setIngredients([...ingredients, { quantity: "", measure: "", name: "", substitute: "", showSubstitute: false }])}
          >
            + Add Another Ingredient
          </AddButton>
        </FormGroup>

        {/* Instructions */}
        <FormGroup>
          <Label>Instructions</Label>
          {instructions.map((step, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FullWidthTextarea
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  style={{ flex: 1 }}
                />
                <DeleteButton
                  type="button"
                  onClick={() => {
                    const newInstructions = instructions.filter((_, i) => i !== index);
                    setInstructions(newInstructions);
                  }}
                >
                  Delete
                </DeleteButton>
              </div>
              <ErrorText isVisible={!!errors[`instruction${index}`]}>{errors[`instruction${index}`]}</ErrorText>
            </div>
          ))}
          <AddButton
            type="button"
            onClick={handleAddStep}
          >
            + Add Step
          </AddButton>
          <ErrorBubble isVisible={showAddStepError}>Please complete this step before adding a new one.</ErrorBubble>
        </FormGroup>

        {/* Photo Upload */}
        <FormGroup style={{ alignItems: 'center', textAlign: 'center' }}>
          <Label style={{ marginBottom: '10px' }}>Photo:</Label>
          <CameraButton onClick={() => document.getElementById('fileInput').click()}>
            📷
          </CameraButton>
          <HiddenFileInput
          type="file"
           id="fileInput"
           onChange={handleFileChange}
         />
       {file && <p>Selected file: {file.name}</p>}
        </FormGroup>


        <FormGroup>
        <Label>Categories (Choose relevant categories for your recipe):</Label>
          <CategoryContainer>
          {categories.map((category, index) => (
           <CategoryOption
            key={index}
          onClick={() => handleCategoryClick(category)}
          className={selectedCategories.includes(category) ? "selected" : ""}
        >
        {category}
        </CategoryOption>
       ))}
        </CategoryContainer>
      </FormGroup>

        {/* Labels Section */}
        <FormGroup>
          <Label>Labels (Select any that apply to your recipe):</Label>
          <TagContainer>
            {tags
              .filter((tag) => !selectedTags.find((t) => t.label === tag.label))
              .map((tag, index) => (
                <Tag key={index} onClick={() => handleTagClick(tag)}>
                  <Icon>{tag.icon}</Icon>
                  {tag.label}
                </Tag>
              ))}
          </TagContainer>

          <Label style={{ marginTop: '20px' }}>Selected Labels:</Label>
          <SelectedTagsContainer>
            {selectedTags.map((tag, index) => (
              <SelectedTag key={index} onClick={() => handleRemoveTag(tag)}>
                <Icon>{tag.icon}</Icon>
                {tag.label}
              </SelectedTag>
            ))}
          </SelectedTagsContainer>
        </FormGroup>

        {/* Submit Button */}
        <SubmitButton type="submit" disabled={!isFormValid()}>
  Submit Recipe
        </SubmitButton>
      </Form>
    </PageWrapper>
  );
};

export default AddRecipePage;