
import {useDispatch, useSelector} from "react-redux";

import {useEffect} from "react";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getAllBooks} from "../../slices/bookSlice.ts";
import {Book} from "../../view/common/Book/Book.tsx";

/*type ProductData = {
    id: number,
    name: string,
    price: string,
    currency: string,
    image: string
};*/

export function Home() {

   const dispatch=  useDispatch<AppDispatch>();

   const {list} = useSelector((state: RootState) => state.books);

    /*const [products, setProducts] = useState<ProductData[]>([]); // Initialize products state*/

    useEffect(() => {
        //to get data
     /*  const fetchData = async () => {
          try{
              const response= await fetch('./product-data.json');
              const jsonData= await response.json();
            /!*  console.log(jsonData);*!/
              setProducts(jsonData); // Set the products state with fetched data
           /!*   console.log(jsonData);*!/
          }catch (error) {
              console.error('Error fetching data:', error);
          }
       }
       fetchData();*/

        //to dispatch data
        dispatch(getAllBooks());


    }, []);
    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5 justify-center items-center mx-auto">
                {
                    list.map((book) => (
                      <Book key={book.id} data={book}/>
                    ))
                }

            </div>
        </div>
    );
}