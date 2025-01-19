import TransactionDetails from '@/components/dashboard/transactions/TransactionDetails'
import React from 'react'

const TransactionPage = async({params}:{params:Promise<{id:string}>}) => {
    const id=(await params).id
  return (
    <main className='w-full h-full'>
        <TransactionDetails id={id}/>
    </main>
  )
}

export default TransactionPage
