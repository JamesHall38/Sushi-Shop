import React from 'react'
import { IconButton, Card } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import useStyles from './styles'
import californiaRoll from '../../../assets/CaliforniaRoll.avif'
import sushi from '../../../assets/Sushi.avif'
import maki from '../../../assets/Maki.avif'



const CartItem = ({ cart, products, onUpdateCartQty, onAddToCart }) => {
  const classes = useStyles()

  const handleUpdateCartQty = (productName, add) => {
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
            onClick={() => handleUpdateCartQty('California Roll', -1)}>
            <Remove />
          </IconButton>

          <img src={californiaRoll} alt="californiaRoll" style={{ width: '60%' }} />

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('California Roll', 1)}>
            <Add />
          </IconButton>

        </Card>
        <Card className={classes.buttons} >

          <IconButton size='small' className={classes.button}
            onClick={() => handleUpdateCartQty('Maki', false)}>
            <Remove />
          </IconButton>

          <img src={maki} alt="maki" style={{ width: '60%' }} />

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

          <img src={sushi} alt="sushi" style={{ width: '60%' }} />

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
