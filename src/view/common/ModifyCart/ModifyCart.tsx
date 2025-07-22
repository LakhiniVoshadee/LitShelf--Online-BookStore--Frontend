
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {decreaseQuantity, increaseQuantity} from "../../../slices/cartSlice.ts";
import type {BookData} from "../../../model/BookData.ts";


interface ModifyCart{
    data: {book: BookData}; // Adjust the type as needed
}

/*export const itemsList:CartItem[] = [];*/

export function ModifyCart({data}: ModifyCart) {

    const dispatch = useDispatch<AppDispatch>(); // Get the dispatch function

    // const [itemCount, setItemCount] = useState(1);  //this is the hook of the item count

    const item = useSelector((state: RootState) => state.cart.items.find(cartItem => cartItem.book.id === data.book.id));



    /*useEffect(() => {
       let existingItem = itemsList.find(item => item.product.id === data.product.id);

       if(existingItem) {
            // If the item already exists, update its count
            existingItem.itemCount = itemCount;
        }
        else {
            // If the item does not exist, add it to the list
            itemsList.push({
                product: data.product,
                itemCount: itemCount
            });

       }

        console.log(itemsList);

    }, [itemCount, data]);*/

    const decreaseItemCount = () => {
        /*  setItemCount((preValue =>
              preValue > 1 ? preValue - 1 : (alert("Item count can not be less than 1"), preValue))
          )*/

        if (item && item.bookCount > 1) { // Check if the item count is greater than 1
            //  setItemCount(itemCount - 1);   // Decrease the item count
            dispatch(decreaseQuantity(data.book.id)); // Dispatch the decreaseQuantity action
        } else {
            alert("Item count can not be less than 1");
        }
    }

    const increaseItemCount = () => {
        // setItemCount((preValue) => preValue + 1);

        // setItemCount((preValue) => preValue + 1); // Increase the item count
        dispatch(increaseQuantity(data.book.id)); // Dispatch the increaseQuantity action
    }
    return (
        <div
            className="w-full max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mx-2 mb-4 text-center">
            <div className="flex items-center justify-center p-4 gap-3">
                <button
                    onClick={decreaseItemCount}
                    className="bg-gray-400 text-gray-800 text-lg font-semibold w-8 h-8
                    rounded-lg hover:bg-white-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                >
                    -
                </button>
                <small className="text-lg text-gray-800 font-medium">{item?.bookCount}</small>
                <button
                    onClick={increaseItemCount}
                    className="bg-gray-400 text-white text-lg font-semibold w-8 h-8 rounded-lg
                    hover:bg-white-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                >
                    +
                </button>
            </div>
        </div>
    );
}