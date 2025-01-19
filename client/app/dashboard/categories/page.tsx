"use client"
import CategoriessHeader from '@/components/dashboard/categories/CategoriesHeader'
import CategoriesList from '@/components/dashboard/categories/CategoriesList';
import { useCategories } from '@/contexts/CategoriesProvider';
import React, { useEffect, useState } from 'react'

const CategoriesPage = () => {
      const [perPage, setPerPage] = useState(6);
      const {categories}=useCategories()
      console.log(categories)
      const [filteredCategories, setFilteredCategories] =
        useState(categories);
      const handleFilter = (filter: string) => {
        if (filter === "all") {
          setFilteredCategories(categories);
        } else {
          setFilteredCategories(
            categories.filter((category) => category.type === filter)
          );
        }
      };
      useEffect(()=>{
        setFilteredCategories(categories)
      },[categories])
  return (
    <main className='w-full h-full'>
      <CategoriessHeader handleActive={handleFilter}/>
      <CategoriesList items={filteredCategories}/>
    </main>
  )
}

export default CategoriesPage
