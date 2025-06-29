import { useState, useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const { users } = useUsers();

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const login = (username, password) => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        const foundUser = users.find(
            u => u && u.username && u.password && u.username.trim() === trimmedUsername && u.password.trim() === trimmedPassword
        );
        
        if (foundUser) {
            setUser(foundUser);
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('loggedInUser');
    };

    return { user, login, logout };
};