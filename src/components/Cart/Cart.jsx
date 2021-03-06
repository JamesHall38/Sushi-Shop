import { useEffect, useState } from 'react'
import { Grid, Card, Typography, Button } from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import Product from './Product/Product'
import { Link } from 'react-router-dom'
import useStyles from './styles'

import californiaRollImg from '../../assets/CaliforniaRoll.png'
import sushiImg from '../../assets/Sushi.png'
import makiImg from '../../assets/Maki.png'
import allImg from '../../assets/rotatingSushi.gif'


const Cart = ({ onAddToCart, cart, products, onUpdateCartQty, onRemoveFromCart, onBack }) => {
  const classes = useStyles()

  const [sushi, setSushi] = useState({ quantity: 0 })
  const [maki, setMaki] = useState({ quantity: 0 })
  const [californiaRoll, setCaliforniaRoll] = useState({ quantity: 0 })
  const [totalPrice, setTotalPrice] = useState()


  const [stop, setStop] = useState(true)
  useEffect(() => {
    if (Object.keys(cart).length) {
      if (stop) {
        setSushi(cart.line_items.find(child => child.name === 'Sushi') ? cart.line_items.find(child => child.name === 'Sushi') : { quantity: 0 })
        setMaki(cart.line_items.find(child => child.name === 'Maki') ? cart.line_items.find(child => child.name === 'Maki') : { quantity: 0 })
        setCaliforniaRoll(cart.line_items.find(child => child.name === 'California Roll') ? cart.line_items.find(child => child.name === 'California Roll') : { quantity: 0 })
        setStop(false)
      }
      setTotalPrice(cart.subtotal.formatted_with_symbol)
    }
  }, [cart, stop])

  const FilledCart = () => (
    <Card className={classes.total}>
      <img src={californiaRollImg} alt="californiaRoll" style={{ width: '60%' }} />
      <Card className={classes.numbers}>
        <Typography variant='h5' component='h2' >
          {californiaRoll ? californiaRoll.quantity : '0'}
        </Typography>
      </Card>
      <img src={makiImg} alt="maki" style={{ width: '60%' }} />
      <Card className={classes.numbers}>
        <Typography variant='h5' component='h2'>
          {maki ? maki.quantity : '0'}
        </Typography>
      </Card>
      <img src={sushiImg} alt="sushi" style={{ width: '60%' }} />
      <Card className={classes.numbers}>
        <Typography variant='h5' component='h2'>
          {sushi ? sushi.quantity : '0'}
        </Typography>
      </Card>

      <Card className={classes.numbers} >
        <Typography variant='h5' component='h2' style={{ color: 'white', fontSize: 'small', textAlign: 'center', padding: '16px 3px' }}>
          This website is in demo but you can try to place an order.
        </Typography>
      </Card>
      <Card className={classes.numbers} >
        <Typography variant='h5' component='h2' style={{ color: 'yellow' }} >
          {totalPrice}
        </Typography>
      </Card>
    </Card>
  )


  return (
    <Grid container justifyContent='space-evenly' alignItems='center' >

      <Grid item xs={12} md={6} className={classes.products} >
        <img src={allImg} alt="all" style={{ height: '55vh', position: 'relative', paddingRight: '15px' }} />
        <div className={classes.products} style={{ flexDirection: 'column' }}>
          {products.map((product, index) => (
            <Product key={index} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </Grid>

      <Grid item xs={8} md={4} >
        <CartItem style={{ padding: '0', position: 'absolute' }}
          onUpdateCartQty={onUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
          products={products}
          cart={cart}
          onAddToCart={onAddToCart}
          sushi={sushi}
          setSushi={setSushi}
          maki={maki}
          setMaki={setMaki}
          californiaRoll={californiaRoll}
          setCaliforniaRoll={setCaliforniaRoll}
        />
      </Grid>

      <Grid item xs={3} md={2} className={classes.totalAndButtons} >
        <FilledCart />
        <Button size='small' className={classes.buttons} variant='outlined' disableElevation component={Link} to='/checkout' > checkout </Button>
        <Button size='small' className={classes.buttons} variant='outlined' disableElevation onClick={() => onBack(false)} component={Link} to='/' > back </Button>
      </Grid>

    </Grid >
  )
}

export default Cart
