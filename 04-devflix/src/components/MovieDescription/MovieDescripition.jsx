import styles from "./MovieDescription.module.css"

const MovieDescripition = (props) => {
  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={() => ""}>

      </div>
    </div>
  )
}

export default MovieDescripition