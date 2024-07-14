import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TextField = ({ label, inputProps, onChange, value, style }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-base text-gray-800">{label}</label>
      <input
        className="px-3 py-2 bg-gray-200 border-2 outline-none"
        {...inputProps}
        onChange={onChange}
        value={value}
        style={style}
      />
    </div>
  )
}

export default TextField
