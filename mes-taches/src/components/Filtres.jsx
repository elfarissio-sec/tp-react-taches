
function Filtres({ filtre, onChanger }) {
  const options = [
    { valeur: 'toutes', label: 'Toutes' },
    { valeur: 'actives', label: 'À faire' },
    { valeur: 'terminees', label: 'Terminées' }
  ]

  return (
    <div className="filtres">
      {options.map((option) => (
        <button
          key={option.valeur}
          className={filtre === option.valeur ? 'actif' : ''}
          onClick={() => onChanger(option.valeur)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default Filtres
