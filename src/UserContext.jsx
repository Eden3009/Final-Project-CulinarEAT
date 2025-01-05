import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores user details
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status

    // Fetch session on app load
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:5001/session', {
                    credentials: 'include', // Include cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkSession();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};
