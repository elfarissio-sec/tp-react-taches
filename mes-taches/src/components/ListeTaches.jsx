function ListeTaches() {
  return (
    <ul className="liste-taches">
      <li className="tache">
        <span className="titre">Comprendre React</span>
      </li>

      <li className="tache terminee">
        <span className="titre">Installer Node.js et Vite</span>
      </li>

      <li className="tache">
        <span className="titre">Comprendre JSX</span>
      </li>
    </ul>
  )
}

export default ListeTaches