import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  root: {
    position: 'relative',
    background: 'rgba(0, 0, 0, 0)',
    color: 'white',
    boxShadow: 'none',
    height: '20vh',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))
