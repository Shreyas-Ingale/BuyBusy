// imports
import { createContext, useContext, useEffect, useState, } from "react";
import { useAuthContext } from "../context/authContext";
import { data } from "../data";
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import db from "../firebaseInit"
import { toast } from "react-toastify";

// custom hook for custom context 
const productContext = createContext();

function useProductContext() {
    const value = useContext(productContext);
    return value;
}

// custom context
function ProductContext({ children }) {
    // categories of products
    const categories = ["Men's Clothing", "Women's Clothing", "Electronics", "Jewellery"];
    // Auth context
    const { user } = useAuthContext();
    // different states 
    const [products, setProducts] = useState(data);
    const [searchText, setSearchText] = useState("");
    const [filterPrice, setFilterPrice] = useState(50000);
    const [filterCategories, setFilterCategories] = useState([]);
    const [cart, setCart] = useState({ count: 0, cost: 0, items: [] });
    const [orders, setOrders] = useState([]);
    // using refresh to update the page after actions on cart items (add/remove/inc/dec)
    const [refresh, setRefresh] = useState(false);

    // get the search text from input
    const handleSearch = (e) => {
        const search = e.target.value;
        setSearchText(search);
    }

    // get the filter values from filter inputs
    const handleFilter = (category, price) => {
        setFilterPrice(price);
        if (category !== null) {
            if (filterCategories.includes(category)) {
                const temp = filterCategories.filter((cat) => cat !== category);
                setFilterCategories(temp);
            }
            else {
                setFilterCategories([...filterCategories, category]);
            }
        }
    }

    // get the items already in the cart
    const fetchCartItems = () => {
        if (user) {
            onSnapshot(doc(db, "users", user.email), (currentUser) => {
                if (currentUser.data()) {
                    setCart(currentUser.data().cart);
                }
            })
        }
    }

    // fetch prev orders
    const fetchOrders = () => {
        if (user) {
            onSnapshot(doc(db, "users", user.email), (currentUser) => {
                if (currentUser.data()) {
                    setOrders(currentUser.data().orders);
                }
            })
        }
    }

    // add an item to the cart
    const addToCart = async (data) => {
        const isItemPresent = cart.items.some((item) => item.id === data.id);
        const item = { category: data.category, id: data.id, image: data.image, price: data.price, name: data.name, count: 1 };
        if (isItemPresent) {
            toast.info("Item already present in the cart !");
            return;
        }
        await updateDoc(doc(db, "users", user.email), {
            cart: {
                cost: cart.cost + item.price,
                count: cart.count + 1,
                items: [...cart.items, item]
            }
        });
        toast.success("Item added Successfully!");
        setRefresh(!refresh);
    }

    // remove an item from the cart
    const removeFromCart = async (data) => {
        const removedItem = cart.items.find((item) => item.id === data.id);
        const updatedItems = cart.items.filter((item) => item.id !== data.id);
        console.log(removedItem);
        await updateDoc(doc(db, "users", user.email), {
            cart: {
                cost: cart.cost - (data.price * removedItem.count),
                count: cart.count - removedItem.count,
                items: updatedItems
            }
        });
        toast.success("Item removed Successfully!");
        setRefresh(!refresh);
    }

    // increase the count of an item in the cart
    const increaseCount = async (data) => {
        const index = cart.items.findIndex((item) => item.id === data.id);
        if (index !== -1) {
            cart.items[index].count++;
            await updateDoc(doc(db, "users", user.email), {
                cart: {
                    cost: cart.cost + data.price,
                    count: cart.count + 1,
                    items: cart.items
                }
            });
            setRefresh(!refresh);
        }
    }

    // decrease the count of an item in the cart
    const decreaseCount = async (data) => {
        const index = cart.items.findIndex((item) => item.id === data.id);
        if (index !== -1) {
            if (cart.items[index].count > 1) {
                cart.items[index].count--;
                await updateDoc(doc(db, "users", user.email), {
                    cart: {
                        cost: cart.cost - data.price,
                        count: cart.count - 1,
                        items: cart.items
                    }
                });
                setRefresh(!refresh);
            }
            else {
                removeFromCart(data);
            }
        }
    }

    // clear the cart
    const clearCart = async () => {
        await updateDoc(doc(db, "users", user.email), {
            cart: {
                cost: 0,
                count: 0,
                items: []
            }
        });
        setRefresh(!refresh);
    }

    // purchase all the items in the cart
    const purchaseAll = async () => {
        let date = new Date();
        let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        let order = {
            orderDate: currentDate,
            total: cart.cost,
            details: cart.items
        }
        await updateDoc(doc(db, "users", user.email), {
            orders: [order, ...orders]
        });
        setRefresh(!refresh);
    }

    // apply the filters on the products on load
    useEffect(() => {
        if (filterCategories.length === 0) {
            const filteredProducts = data.filter((product) => product.price <= filterPrice && product.name.toLowerCase().includes(searchText.toLowerCase()));
            setProducts(filteredProducts);
        }
        else {
            const filteredProducts = data.filter((product) => product.price <= filterPrice && filterCategories.includes(product.category) && product.name.toLowerCase().includes(searchText.toLowerCase()));
            setProducts(filteredProducts);
        }
    }, [searchText, filterCategories, filterPrice]);

    // fetch cart items and prev orders on  load
    useEffect(() => {
        if (user) {
            fetchCartItems();
            fetchOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, user, cart]);

    const value = {
        categories,
        handleSearch,
        handleFilter,
        filterCategories,
        filterPrice,
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        increaseCount,
        decreaseCount,
        clearCart,
        purchaseAll,
        fetchCartItems,
        fetchOrders,
        orders
    }



    return (
        <productContext.Provider value={value}>
            {children}
        </productContext.Provider>
    )
}

export default ProductContext;
export { useProductContext };