import BudgetDetails from '@/components/dashboard/budgets/BudgetDetails'
import React from 'react'

const BudgetPage = async({params}:{params:Promise<{id:string}>}) => {
    const id=(await params).id
  return (
    <main className='w-full h-full'>
        <BudgetDetails id={id}/>
    </main>
  )
}

export default BudgetPage
