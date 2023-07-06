import Head from "next/head"
import { ReactNode } from "react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import ProductDetails from "../../components/productDetails"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { ProductType, fetchProduct, fetchProducts } from "../../services/products"

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id

  if (typeof id === 'string') {
    const product = await fetchProduct(id)

    return {
      props: {
        product
      },
      revalidate: 10
    }
  }

  return {
    redirect: {
      destination: '/products',
      permanent: false
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchProducts()

  const paths = products.map(product => {
    return {
      params: {
        id: product.id.toString()
      }
    }
  })

  return { paths, fallback: false }
}

const Product: NextPage = (props: {
  children?: ReactNode
  product?: ProductType
}) => {
  return (
    <div>
      <Head>
        <title>{props.product!.name}</title>
        <meta name="description" content={props.product!.description}/>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <div className="flex m-4 items-center">
        <ProductDetails product={props.product!} />
      </div>
      <Footer />
    </div>
  )
}

export default Product