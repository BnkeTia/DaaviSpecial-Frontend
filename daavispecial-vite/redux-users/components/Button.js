const Button = ({ onClick, children, style }) => {
  return (
    <button
      className="px-6 py-2 my-10 text-white bg-indigo-600 rounded hover:bg-indigo-700"
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
