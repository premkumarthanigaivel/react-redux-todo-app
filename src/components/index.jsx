import React, { Fragment } from 'react'
import { TODO } from './Todo.jsx' 
import { PageContainer,PageFooter, GlobalStyles } from './Todostyles'
const TODOApplication = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <PageContainer>
        <TODO />
      </PageContainer>
      <PageFooter>Authored by, Prem Kumar</PageFooter>
    </Fragment>
  )
}

export { TODOApplication }
