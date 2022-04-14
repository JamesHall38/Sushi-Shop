import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  totalAndButtons: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    margin: '4px',
    position: 'relative',
    width: '100px',
    height: '460px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    background: 'rgba(0,1,1, 0.5)',
    boxShadow: '0 0 0 2px grey'
  },
  numbers: {
    color: 'white',
    background: 'rgba(255,255,255, 0.2)',
  },
  buttons: {
    width: '90px',
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'white',
    margin: '4px',
    overflow: 'hidden',

  },
  products: {
    overflow: 'hidden',
    // width: '10px',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
