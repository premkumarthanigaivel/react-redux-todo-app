import styled, { createGlobalStyle } from 'styled-components'
import List from '@material-ui/core/List'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

export const GlobalStyles = createGlobalStyle`

body{
  font-family: 'Tangerine', cursive;
}

`

// Centers any child component both vertically & horizontally, prefer to keep one child component
export const PageContainer = styled(Box)`
  background-color: #fff;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TODOBox = styled(Box)`
  box-shadow: 0px 0px 11px 1px cornflowerblue;
  border-radius: 0.5em;
  height: 70%;
  width: 40%;
  padding: 30px;
  align-content: center;
  justify-content: flex-end;
  box-sizing: border-box;
  background-color: #bbdefb63;
  flex-direction: column;
  display: flex;
`

export const TODOList = styled(List)`
  height: 77%;
  overflow: scroll;
  margin: 21px 0 !important;
`

export const TODOInput = styled(TextField).attrs(() => ({
  size: 'small',
  variant: 'outlined',
  fullWidth: true,
  autoFocus: true
}))``

export const TODOListItemText = styled(ListItemText)`
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`

export const TODOHeader = styled(Typography).attrs(() => ({
  variant: 'h5',
  component: 'h5'
}))`
  color: darkslateblue;
  text-align: center;
  margin-bottom: 20px !important;
`

export const PageFooter = styled(Typography).attrs(() => ({
  variant: 'h4',
  component: 'h4'
}))`
  color: darkslateblue;
  font-family: 'Tangerine', cursive !important;
  position: absolute;
  right: 15px;
`
