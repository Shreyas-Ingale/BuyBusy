// imports
import { createContext, useContext, useEffect, useState } from "react";

import db, { auth } from "../firebaseInit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// custom hook for the context
const authContext = createContext();

function useAuthContext() {
    const value = useContext(authContext);
    return value;
}

// custom context
function AuthContext({ children }) {
    // state for loading while authentication and for user details
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    // useEffect to get the logged in user
    useEffect(() => {
        setLoading(true);
        // firebase function to moniter status of any login/signup attempt
        const unsubscriber = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                let docSnap = await getDoc(doc(db, "users", currentUser.email));
                let user = docSnap.data();
                setUserDetails(user);
            }
        });
        setLoading(false);
        return unsubscriber;
    }, []);

    // sign up new user
    function signUp(data) {
        setLoading(true);
        // firebase function to create new user with email and password
        createUserWithEmailAndPassword(auth, data.email, data.pswrd)
            .then(async (res) => {
                console.log("Signed Up Successfully!");
                await updateProfile(res.user, {
                    displayName: data.name
                });
                const currentUser = {
                    name: data.name,
                    email: data.email,
                    pswrd: data.pswrd,
                    cart: {
                        count: 0,
                        cost: 0,
                        items: []
                    },
                    orders: []
                }
                await setDoc(doc(db, 'users', currentUser.email), currentUser);
                setUserDetails(currentUser);
                toast.success("Signed Up Successfully! 🥳");
                setLoading(false);
            }).catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    }

    // login existing user
    function logIn(data) {
        setLoading(true);
        // firebase function to login a user with email and password
        signInWithEmailAndPassword(auth, data.email, data.pswrd)
            .then(async (res) => {
                console.log('signed in successfully');
                const currentUser = {
                    name: res.user.displayName,
                    email: res.user.email,
                    pswrd: data.pswrd,
                    cart: {
                        count: 0,
                        cost: 0,
                        items: []
                    },
                    orders: []
                }
                setUserDetails(currentUser);
                toast.success("Signed In Successfully 🥳");
                setLoading(false);
            }).catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    }

    // log out current user
    function logOut() {
        // firebase function to end the session of current user 
        signOut(auth)
            .then(() => {
                console.log("signed out successfully ! ");
                toast.success("Logged Out Successfully! 🙏");
                setUserDetails(null);
                setRefresh(!refresh);
            }).catch((err) => {
                toast.error(err.message);
            });
    }

    return (
        <authContext.Provider value={{ user: userDetails, signUp, logIn, logOut, loading }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContext;
export { useAuthContext };