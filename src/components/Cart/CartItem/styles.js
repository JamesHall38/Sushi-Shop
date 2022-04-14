import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  buttons: {
    width: '125px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255,255,255, 0.2)',
    position: 'relative',
    padding: '8px'
  },
  button: {
    color: 'white',
    maxHeight: '20px',
    maxWidth: '20px',
    background: 'rgba(255,255,255, 0.2)'
  },
  responsiveButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    "@media (max-width: 900px)": {
      flexDirection: 'column',
      alignItems: 'center',
      height: '80vh',
    }
  }
}))
