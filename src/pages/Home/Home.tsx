import { Hero } from "../../components/ui/Hero"
import style from "./Home.module.css"
import { CardProduct } from "../../components/ui/CardProduct"
import { getProducts } from "../../service"
import { Toaster } from "sonner"
import { useQuery } from "react-query"
import { useState } from "react"

const Home = () => {

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['products', page],
    () => getProducts(page),
    { keepPreviousData: true }
  );

  return (
    <>
      <Hero />
      <Toaster richColors />
      {isLoading && <p>Loading ...</p>}
      {error && <p>Something went wrong</p>}
      <div className={style.container}>
        {data?.map((product) => (
          <CardProduct key={product.tail} product={product} />
        ))}
      </div>
      <div className={style.paginationContainer}>
        <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={style.paginationButton}
        >
          pevius page
          </button>
        <div className={style.paginationActive}>
          <span>{page}</span>
        </div>
        <button
        onClick={() => setPage(page + 1)}  
        className={style.paginationButton}      
        >
          next page
          </button>
      </div>
    </>
  )
}

export default Home
