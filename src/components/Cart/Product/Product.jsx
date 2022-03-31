import { Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './styles'

const Product = ({ product }) => {
  const classes = useStyles()

  return (
    <>
      <Card className={classes.root}>
        <CardContent style={{ paddingBottom: '0', padding: '0' }}>
          <div className={classes.cardContent}>
            <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" component="p" style={{ fontSize: 'small' }} />
            <Typography gutterBottom variant="h5" component="h2" style={{ color: 'yellow', marginLeft: '30px' }} >
              ${product.price.formatted}
            </Typography>
          </div>

        </CardContent>
      </Card>
    </>
  )
}

export default Product

