import { useState } from "react"
import { ProductType } from "../../services/products"
import Link from "next/link"
import Image from "next/image"
import SuccessToast from "../successToast"
import toast from "react-hot-toast"
import { useCart } from "../../hooks/useCart"
type ProductCardProps = {
  product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [toastIsOpen, setToastIsOpen] = useState(false)
  const { id, name, imageUrl, price, inStock } = product
  const notifyToast = () => toast.success('Adicionado ao carrinho', {position: 'top-center'})
  const {addProduct} = useCart()
  const add = () => {addProduct(product)}
  // const notifyToast = () => toast.promise(
  //   saveSettings(settings),
  //   {
  //     loading: 'Adicionando ao carrinho...',
  //     success: <b>Produto adicionado!</b>,
  //     error: <b>Erro, tente novamente..</b>,
  //   }
  // );

  return (
    <>
      <div
        className="card shadow-xl bg-white scaleforce transition-all duration-200">
          <Link className="no-underline" href={`/products/${id}`}>
            <Image 
              className="card-img-top hover:animate-rotate max-h-200"
              src={imageUrl}
              alt={product.name}
              height={200}
              width={300}
              priority={true}
            />
          <p
            className="car-title text-lg font-bold text-green pl-8 select-none"
            >{product.name}
          </p>
              </Link>
        <div className="card-body">
          <div
            className="flex mb-3 text-muted font-bold text-gray-dark justify-between">
            <span className="select-none">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            <span className="select-none">
              Qtd: {inStock}
            </span>
          </div>
          <div className="card-actions justify-end ">
            <button
              className="p-4 rounded-lg uppercase text-white font-bold border-none bg-gray-dark cursor-pointer select-none
              hover:bg-green transition-all transition-color duration-200 delay-200"
              onClick={() => {
                notifyToast()
                add()
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      <SuccessToast
        toastIsOpen={toastIsOpen}
        setToastIsOpen={setToastIsOpen}
      />
    </>
  )
}

export default ProductCard
