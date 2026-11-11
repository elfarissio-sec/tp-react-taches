import { useState , useEffect } from 'react'

import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'
import FormulaireAjout from './components/FormulaireAjout'
import Filtres from './components/Filtres'
import Statistiques from './components/Statistiques'
import Horloge from './components/Horloge.jsx'



function App() {
  const [taches, setTaches] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [filtre, setFiltre] = useState('toutes')

  useEffect(() => {
    let annule = false

    fetch('/taches.json')
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP ${reponse.status}`)
        }

        return reponse.json()
      })
      .then((donnees) => {
        if (!annule) {
          setTaches(donnees)
        }
      })
      .catch((err) => {
        if (!annule) {
          setErreur(err.message)
        }
      })
      .finally(() => {
        if (!annule) {
          setChargement(false)
        }
      })

    return () => {
      annule = true
    }
  }, [])

  function ajouterTache(titre) {
    const nouvelleTache = {
      id: Date.now(),
      titre: titre,
      terminee: false
    }

    setTaches([...taches, nouvelleTache])
  }

  function basculerTache(id) {
    setTaches(
      taches.map((tache) =>
        tache.id === id
          ? { ...tache, terminee: !tache.terminee }
          : tache
      )
    )
  }

  function supprimerTache(id) {
    setTaches(
      taches.filter((tache) => tache.id !== id)
    )
  }

  const tachesVisibles = taches.filter(tache => {
    if (filtre === 'actives') return !tache.terminee
    if (filtre === 'terminees') return tache.terminee
    return true
  })


  const restantes = taches.filter(
    tache => !tache.terminee
  ).length

  useEffect(() => {
    document.title = `(${restantes}) Mes tâches`
  }, [restantes])

  return (
    <div className="app">

      <Entete
        titre="Mes tâches"
        sousTitre="Mon premier projet React"
      />

      <Carte titre="Heure actuelle">
        <Horloge />
      </Carte>

      <Carte titre="Compteur">
        <Compteur />
      </Carte>

      <Carte titre="Ajouter une tâche">
        <FormulaireAjout onAjouter={ajouterTache} />
      </Carte>

      <Carte titre="Ma liste">
        <Filtres
          filtre={filtre}
          onChanger={setFiltre}
        />
        {chargement && (
          <p className="vide">Chargement des tâches…</p>
        )}

        {erreur && (
          <p className="erreur">{erreur}</p>
        )}

        {!chargement && !erreur && (
          <ListeTaches
            taches={tachesVisibles}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />
        )}
      </Carte>

      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>

      <Pied auteur="Oussama El Farissi" />

    </div>
  )
}

export default App