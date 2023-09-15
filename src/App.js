// imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Error from "./components/Error"
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // routes for different pages of the app with navbar as a parent route
  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar />, errorElement: <Error />, children: [
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/orders", element: <Orders /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/signin", element: <SignIn /> }
      ]
    }
  ])
  return (
    <>
      {/* toast */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
