import React from 'react'
import { IconButton, Card } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import useStyles from './styles'
import californiaRollImg from '../../../assets/CaliforniaRoll.png'
import sushiImg from '../../../assets/Sushi.png'
import makiImg from '../../../assets/Maki.png'



const CartItem = ({ cart, products, onUpdateCartQty, onAddToCart, onRemoveFromCart, sushi, setSushi, maki, setMaki, californiaRoll, setCaliforniaRoll }) => {
  const classes = useStyles()

  const handleUpdateCartQty = (productName, add) => {
    // if (productName === 'Sushi') {
    //   setSushi(sushi ? { quantity: sushi.quantity > 0 ? sushi.quantity + (add ? 1 : -1) : 0 } : add ? { quantity: 1 } : { quantity: 0 })
    // } else if (productName === 'Maki') {
    //   setMaki(maki ? { quantity: maki.quantity > 0 ? maki.quantity + (add ? 1 : -1) : 0 } : add ? { quantity: 1 } : { quantity: 0 })
    // } else if (productName === 'California Roll') {
    //   setCaliforniaRoll(californiaRoll ? { quantity: californiaRoll.quantity > 0 ? californiaRoll.quantity + (add ? 1 : -1) : 0 } : add ? { quantity: 1 } : { quantity: 0 })
    // }

    console.log(sushi)

    if (productName === 'Sushi') {
      if (sushi.quantity === 0 && add) {
        setSushi({ quantity: 1 })
        onAddToCart(products.find(child => child.name === productName).id, 1)
      }
      else if (sushi.quantity === 1 && !add) {
        setSushi({ quantity: 0 })
        onRemoveFromCart(cart.line_items.find(child => child.name === productName).id, 1)
      }
      else if (sushi.quantity > 1 || (sushi.quantity === 1 && add)) {
        onUpdateCartQty(cart.line_items.find(child => child.name === productName).id, sushi.quantity + (add ? 1 : -1))
        setSushi({ quantity: sushi.quantity + (add ? 1 : -1) })
      }
    }
    else if (productName === 'Maki') {
      if (maki.quantity === 0 && add) {
        setMaki({ quantity: 1 })
        onAddToCart(products.find(child => child.name === productName).id, 1)
      }
      else if (maki.quantity === 1 && !add) {
        setMaki({ quantity: 0 })
        onRemoveFromCart(cart.line_items.find(child => child.name === productName).id, 1)
      }
      else if (maki.quantity > 1 || (maki.quantity === 1 && add)) {
        onUpdateCartQty(cart.line_items.find(child => child.name === productName).id, maki.quantity + (add ? 1 : -1))
        setMaki({ quantity: maki.quantity + (add ? 1 : -1) })
      }
    }
    else if (productName === 'California Roll') {
      if (californiaRoll.quantity === 0 && add) {
        setCaliforniaRoll({ quantity: 1 })
        onAddToCart(products.find(child => child.name === productName).id, 1)
      }
      else if (californiaRoll.quantity === 1 && !add) {
        setCaliforniaRoll({ quantity: 0 })
        onRemoveFromCart(cart.line_items.find(child => child.name === productName).id, 1)
      }
      else if (californiaRoll.quantity > 1 || (californiaRoll.quantity === 1 && add)) {
        onUpdateCartQty(cart.line_items.find(child => child.name === productName).id, californiaRoll.quantity + (add ? 1 : -1))
        setCaliforniaRoll({ quantity: californiaRoll.quantity + (add ? 1 : -1) })
      }
    }




    // if (!cart?.line_items.find(child => child.name === productName) && add) {
    //   console.log("qkscb")
    //   onAddToCart(products.find(child => child.name === productName).id, 1)
    // }

    // cart.line_items.forEach(element => {

    //   if (element.name === productName) {
    //     if (element.name === 'Sushi') {
    //       if (sushi.quantity > 1) {
    //         setSushi({ quantity: sushi.quantity + (add ? 1 : -1) })
    //         onUpdateCartQty(element.id, sushi.quantity)
    //       }
    //       else
    //         onRemoveFromCart(element.id)
    //     }
    //     if (element.name === 'Maki') {
    //       if (maki.quantity > 1) {
    //         setMaki({ quantity: maki.quantity + (add ? 1 : -1) })
    //         onUpdateCartQty(element.id, maki.quantity)
    //       }
    //       else
    //         onRemoveFromCart(element.id)
    //     }
    //     if (element.name === 'California Roll') {
    //       if (californiaRoll.quantity > 1) {
    //         setCaliforniaRoll({ quantity: californiaRoll.quantity + (add ? 1 : -1) })
    //         onUpdateCartQty(element.id, californiaRoll.quantity)
    //       }
    //       else
    //         onRemoveFromCart(element.id)
    //     }
    //   }
    // })

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
