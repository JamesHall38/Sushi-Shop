import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
    root: {
        background: 'black',
        width: '100vw',
        height: '100vh',
    },
    suspense: {
        position: 'absolute',
        background: 'rgb(0,0,0,0)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    load: {
        background: 'black',
        width: '50px',
        height: '50px',
        border: 'solid 5px #fff',
        borderRadius: '50%',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        transition: 'all 0.5s ease-in',
        animationName: '$rotate',
        animationDuration: ' 1.0s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
    },
    canvas: {
        background: "black",
        width: '100vw',
        height: '100vh',
        animationName: '$fadein',
        animationDuration: ' 1.0s',
    },
    '@keyframes rotate': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        }
    },
    '@keyframes fadein': {
        from: {
            opacity: '0'
        },
        to: {
            opacity: '1'
        },
    }
}))