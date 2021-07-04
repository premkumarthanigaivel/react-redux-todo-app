import React from 'react'
import { PageContainer } from './Todostyles'
import { TODO } from './Todo.jsx'
import { PageFooter, GlobalStyles } from './Todostyles'
const TODOApplication = () => {
  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <TODO />
      </PageContainer>
      <PageFooter>🂡</PageFooter>
    </>
  )
}

export { TODOApplication }
