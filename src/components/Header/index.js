import React from 'react'
import Button from '../Button'
import styles from './index.module.css'

const Header = (props) => {
    const { eth, setAddress, address, setSearch, search } = props

    const handleInput = (e) => {
        const { value } = e.target
        setAddress(value)
    }

    return (
        <div className={styles.header}>
            <h3>
                Address:{' '}
                <input
                    className={styles.addressInput}
                    onChange={handleInput}
                    value={address}
                />
                <Button setSearch={setSearch} search={search} />
            </h3>

            <h4>
                ETH Balance: {eth?.balance} Price: ${eth?.price?.rate}
            </h4>
        </div>
    )
}

export default Header
