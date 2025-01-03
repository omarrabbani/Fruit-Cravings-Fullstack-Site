import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreProvider = (props) => {
    const [cartItems,setCartItems] = useState({});
    const url = "https://fruit-cravings-backend.onrender.com";
    const [token,setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedItems = { ...prev };
            updatedItems[itemId] = (updatedItems[itemId] || 0) + 1;
            return updatedItems;
        });
        if (token){
            await axios.post(url + "/api/cart/add", {itemId}, {headers:{token}})
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedItems = { ...prev };
            if (updatedItems[itemId] > 1) {
                updatedItems[itemId] -= 1;
            } else {
                delete updatedItems[itemId];
            }
            return updatedItems;
        });
        if (token){
            await axios.post(url + "/api/cart/remove", {itemId}, {headers:{token}})
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if (cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id===item);
                totalAmount+= itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        console.log("fetchFoodList called");
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    };

    const loadCartData = async (token) =>{
        const response = await axios.post(url + "/api/cart/get", {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
          {props.children}
        </StoreContext.Provider>
    );
      
}

export default StoreProvider
