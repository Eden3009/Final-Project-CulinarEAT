import React, { useState } from 'react';
import axios from 'axios';
import './css/AddRecipePage.css';

function AddRecipePage() {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState(''); // New state for description
    const [ingredients, setIngredients] = useState([{ quantity: '', measure: '', ingredient: '' }]);
    const [instructions, setInstructions] = useState(['']);
    const [photo, setPhoto] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { quantity: '', measure: '', ingredient: '' }]);
    };

    const handleDeleteIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (index, event) => {
        const { name, value } = event.target;
        const newIngredients = [...ingredients];
        newIngredients[index][name] = value;
        setIngredients(newIngredients);
    };

    const handleAddInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const handleDeleteInstruction = (index) => {
        const newInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(newInstructions);
    };

    const handleInstructionChange = (index, event) => {
        const newInstructions = [...instructions];
        newInstructions[index] = event.target.value;
        setInstructions(newInstructions);
    };

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('recipeName', recipeName);
        formData.append('description', description); // Include description in formData
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('instructions', JSON.stringify(instructions));
        if (photo) formData.append('photo', photo);

        try {
            const response = await axios.post('http://localhost:5001/add-recipe', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            setSuccessMessage('Recipe added successfully!');
            setErrorMessage('');
            console.log(response.data);
        } catch (error) {
            setErrorMessage('An error occurred while adding the recipe. Please try again.');
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div className="add-recipe-page">
            <h2>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                {/* Recipe Name */}
                <div className="form-group">
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input 
                        type="text" 
                        id="recipeName" 
                        value={recipeName} 
                        onChange={(e) => setRecipeName(e.target.value)} 
                        required 
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a short description of the recipe"
                        required
                    />
                </div>

                {/* Ingredients */}
                <h3>Ingredients</h3>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-group">
                        <input 
                            type="text" 
                            name="quantity" 
                            placeholder="Quantity" 
                            value={ingredient.quantity} 
                            onChange={(e) => handleIngredientChange(index, e)} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="measure" 
                            placeholder="Measure Type" 
                            value={ingredient.measure} 
                            onChange={(e) => handleIngredientChange(index, e)} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="ingredient" 
                            placeholder="Ingredient" 
                            value={ingredient.ingredient} 
                            onChange={(e) => handleIngredientChange(index, e)} 
                            required 
                        />
                        <button type="button" onClick={() => handleDeleteIngredient(index)} className="delete-button">Delete Ingredient</button>
                    </div>
                ))}
                <div className="button-group">
                    <button type="button" onClick={handleAddIngredient} className="add-button">+ Add Ingredient</button>
                </div>

                {/* Instructions */}
                <h3>Instructions</h3>
                {instructions.map((instruction, index) => (
                    <div key={index} className="instruction-group">
                        <textarea
                            placeholder={`Step ${index + 1}`}
                            value={instruction}
                            onChange={(e) => handleInstructionChange(index, e)}
                            required
                        />
                        <button type="button" onClick={() => handleDeleteInstruction(index)} className="delete-button">Delete Step</button>
                    </div>
                ))}
                <div className="button-group">
                    <button type="button" onClick={handleAddInstruction} className="add-button">+ Add Step</button>
                </div>

                {/* Photo */}
                <div className="form-group">
                    <label htmlFor="photo">Photo:</label>
                    <input type="file" id="photo" onChange={handlePhotoChange} />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">Submit Recipe</button>

                {/* Success and Error Messages */}
                {successMessage && <div className="success">{successMessage}</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default AddRecipePage;
