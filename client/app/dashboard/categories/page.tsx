"use client"
import CategoriessHeader from '@/components/dashboard/categories/CategoriesHeader'
import CategoriesList from '@/components/dashboard/categories/CategoriesList';
import { dummyCategories } from '@/constants/requests';
import React, { useState } from 'react'

const CategoriesPage = () => {
      const [perPage, setPerPage] = useState(6);
      const [filteredCategories, setFilteredCategories] =
        useState(dummyCategories);
      const handleFilter = (filter: string) => {
        if (filter === "all") {
          setFilteredCategories(dummyCategories);
        } else {
          setFilteredCategories(
            dummyCategories.filter((category) => category.type === filter)
          );
        }
      };
  return (
    <main className='w-full h-full'>
      <CategoriessHeader handleActive={handleFilter}/>
      <CategoriesList items={filteredCategories}/>
    </main>
  )
}

export default CategoriesPage
