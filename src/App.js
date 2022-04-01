import React, { useState, useEffect, Suspense } from 'react'
import { CssBaseline, Button } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { Cart, Checkout, Model } from './components'
import { commerce } from './lib/commerce'
import { Canvas } from '@react-three/fiber'
import useStyles from './components/styles'




const Home = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [shopPage, setShopPage] = useState(false)

  const classes = useStyles()

  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigateToCart = () => {
    navigate('/cart')
    setShopPage(true)
  }

  useEffect(() => {
    if (location.pathname === '/')
      setShopPage(false)
    else
      setShopPage(true)
  }, [location.pathname])


  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])


  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity })
    setCart(response.cart)
  }
  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId)
    setCart(response.cart)
  }
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    setCart(response.cart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  return (
    <>
      <Canvas style={{ position: 'fixed' }}
        className={classes.canvas}
        dpr={Math.max(window.devicePixelRatio, 2)}
        flat
        shadows
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [8, 6, 12], fov: 50 }}
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = true
        }} >
        <Model shopPage={shopPage} onStoreButton={handleNavigateToCart} />
      </Canvas>

      <Routes>
        <Route exact path="/" element={<></>} />
        <Route exact path="/cart" element={
          <>
            <Button component={Link} to="/"
              onClick={() => setShopPage(false)}
              style={{
                position: 'absolute',
                height: '80px',
                width: '300px',
                letterSpacing: '-3px',
                color: 'yellow',
                fontWeight: '1000',
                fontSize: 'xx-large'
              }} >
              SUSHI SHOP
            </Button>
            <Cart cart={cart}
              refreshCart={refreshCart}
              onBack={setShopPage}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
              products={products}
              onAddToCart={handleAddToCart} />
          </>
        } />
        <Route exact path="/checkout" element={
          <Checkout cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage} />} />
      </Routes>
    </>
  )
}


const App = () => {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <CssBaseline />
      <div className={classes.root}>
        <Suspense fallback={(<div className={classes.suspense} > <div className={classes.load} /> </div>)}>
          <Home />
        </Suspense >
      </div>
    </BrowserRouter>
  )
}

export default App