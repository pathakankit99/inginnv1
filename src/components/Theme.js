import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
  import InputBase from '@material-ui/core/InputBase';
  import InputLabel from '@material-ui/core/InputLabel';
  import TextField from '@material-ui/core/TextField';
  import FormControl from '@material-ui/core/FormControl';
  import { green, blue } from '@material-ui/core/colors';
  
  const CssTextField= withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'blue',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

  export default CssTextField