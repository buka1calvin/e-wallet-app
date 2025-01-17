import React from 'react'

const FeatureCard = ({title,description}:{title:string,description:string}) => {
  return (
    <div className="bg-white/10 shadow-inner shadow-white/30 text-white rounded py-1 px-2 text-pretty">
    <h1 className="font-bold">{title}</h1>
    <p className="text-text font-light text-sm">{description}</p>
  </div>
  )
}

export default FeatureCard
