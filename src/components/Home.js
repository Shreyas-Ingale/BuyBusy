// imports
/* eslint-disable no-unused-vars */
import { useProductContext } from "../context/productContext";
import { useAuthContext } from "../context/authContext";
import ProductCard from "./ProductCard";
import { data } from "../data";
import { useEffect,  } from "react";
import { Grid } from "react-loader-spinner";


function Home() {
    // custom context
    const { user, loading } = useAuthContext();
    const { products, setProducts } = useProductContext();

    // load products
    useEffect(() => {
        setTimeout(() => {
            setProducts(data);
        }, 850)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Grid
                height="80"
                width="80"
                color="#0d6efd"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperClass="loader-style"
                visible={true}
            /> :
                <div className="container h-100">
                    <div className="d-flex align-items-center justify-content-center w-100 border-bottom border-primary  border-2 my-3">
                        <h1 className="display-6 ">Welcome {user && user.name}</h1>
                    </div>
                    <div className="d-flex justify-content-evenly flex-wrap gap-3 my-3">
                        {products.map((product, i) => <ProductCard product={product} key={i} />)}
                    </div>
                </div>}
        </>
    )
}

export default Home;