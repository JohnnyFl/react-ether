import React from 'react'
import styles from "./index.module.css"

const Button = props => {
    const { setSearch, search } = props;
    return <button className={styles.searchButton} onClick={() => setSearch(!search)}>Search</button>
}

export default Button;