import { useAppDispatch, useAppSelector } from "../../app/hooks"

import styles from "./Header.module.css"

import { setFilters } from "./headerSlice"
import { useDebouncedCallback } from 'use-debounce'
import { FaSearch } from "react-icons/fa";

export const Header = () => {
    const dispatch = useAppDispatch()

    const debounceChange = useDebouncedCallback(value => {
        dispatch(setFilters(value))
    }, 1000)

    return (
        <div className={[styles.container, styles.flex].join(' ')}>
            <img className={styles.logo} src="/images/logo.png" alt="Logo" />

            <div className={[styles.flexcolumn , styles.flex, styles.flex1, styles.gap10].join(' ')}>
                <div className={[styles.title, styles.flexcenter , styles.flex].join(' ')}>FOOD TRUCK FINDER FINDER</div>

                <div className = {styles.information}>

                <div style={{position: 'absolute'}}>
                    <FaSearch className={styles.searchIcon} />
                </div>
                
                    <input
                        type="text"
                        onChange={(e) => debounceChange(e.target.value)}
                        placeholder="Search for your favorite food here"
                        className={[styles.searchInput, styles.inputWithIcon].join(' ')}
                    />
                </div>
            </div>
        </div>
    )
}
