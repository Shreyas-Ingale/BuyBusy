# BuyBusy App
> [BuyBusy](https://buybusy.onrender.com) is a web application for the customers of an e-commerce business.

##  Getting Started 
-  Fork the Project in your Repository.
-  Clone the Forked Repository in your Local System.
-  Run 'npm install'.
-  Run 'npm start'.
-  Enjoy :)

For any issues related to the project, raise an ISSUE in the respective Repository.

## Functionalities
- BuyBusy enables individuals to browse through various product to choose from.
- It allows user to create their own account to manage thier cart and orders.
- It provides options for users to add or remove products from their shopping carts.
- It has complete functionality for purchasing the products.
- The application has user-friendly interface and have a visually appealing design that encourages users to explore and use the platform regularly.

## Technologies Used
- React
- Firebase: Authentication
- Firebase: Firestore
- Bootstrap
- react-loader-spinner
- react-toastify
- HTML - CSS

## File Structure
### The PhotoFolio app is built using 8 components:
- Navbar: Displays the logo image, search bar, buttons for login/logout, filters, cart and orders.
- Error: Error Handling Page when there's an error.
- Home: Displays a list of products fetched from the file.
- ProductCard: Displays an individual product.
- Orders: Displays a list of previous orders of a user.
- Cart: Displays items in the cart of a user.
- SignIn: Displays the a Sign-in page.
- SignUp: Displays the a Sign-up page.

### Other files used in the project
- authContext: A context api for user authentication.
- productContext: A context api for product management.
- data: A file containing list of products details.
- firebaseInit: A file for storing firebase configuration.

## API Structure
The firebase API would look like this:
- users to store all the users currently using with the app.
- users/cart To store all the items in cart of a particular user.
- users/order to store all the orders of a particular user.
