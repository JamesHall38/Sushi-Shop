import React from 'react'
import { IconButton, Card } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import useStyles from './styles'
import californiaRollImg from '../../../assets/CaliforniaRoll.png'
import sushiImg from '../../../assets/Sushi.png'
import makiImg from '../../../assets/Maki.png'



const CartItem = ({ cart, products, onUpdateCartQty, onAddToCart, sushi, setSushi, maki, setMaki, californiaRoll, setCaliforniaRoll }) => {
  const classes = useStyles()

  const handleUpdateCartQty = (productName, add) => {
    if (productName === 'Sushi') {
      setSushi(sushi ? { quantity: sushi.quantity > 0 ? sushi.quantity + (add ? 1 : -1) : 0 } : add ? { quantity: 1 } : { quantity: 0 })
    } else if (productName === 'Maki') {
      setMaki(maki ? { quantity: maki.quantity > 0 ? maki.quantity + (add ? 1 : -1) : 0 } : add ? { quantity: 1 } : { quantity: 0 })
    } else if (productName === 'California Roll') {
      setCaliforniaRoll(californiaRoll ? { quantity: californiaRoll.quantity > 0 ? californiaRoll.quantity + (add ? 1 : -1) : 0 } : add ? { quantity: 1 } : { quantity: 0 })
    }


    if (!cart.line_items.find(child => child.name === productName) && add)
      onAddToCart(products.find(child => child.name === productName).id, 1)

    cart.line_items.forEach(element => {
      if (element.name === productName)
        onUpdateCartQty(element.id, element.quantity + (add ? 1 : -1))
    })
  }

  return (
    <>
      <div className={classes.responsiveButtons} >
        <Card className={classes.buttons} >

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('California Roll', false)}>
            <Remove />
          </IconButton>

          <img src={californiaRollImg} alt="californiaRoll" style={{ width: '60%' }} />

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('California Roll', true)}>
            <Add />
          </IconButton>

        </Card>
        <Card className={classes.buttons} >

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('Maki', false)}>
            <Remove />
          </IconButton>

          <img src={makiImg} alt="maki" style={{ width: '60%' }} />

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('Maki', true)}>
            <Add />
          </IconButton>
        </Card>

        <Card className={classes.buttons} >

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('Sushi', false)}>
            <Remove />
          </IconButton>

          <img src={sushiImg} alt="sushi" style={{ width: '60%' }} />

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('Sushi', true)}>
            <Add />
          </IconButton>

        </Card>
      </div >
    </>
  )
}

export default CartItem
