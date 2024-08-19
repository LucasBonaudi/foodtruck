import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"

import styles from "./Header.module.css"
import { useGetFoodTrucksQuery } from "../truckmap/truckmapApiSlice"
import { setFilters } from "./headerSlice"
import { useDebouncedCallback } from 'use-debounce'
 
export const Header = () => {
    const dispatch = useAppDispatch()

    const debounceChange = useDebouncedCallback(value => {
        dispatch(setFilters(value))
    }, 1000)

    return (
        <div className={[styles.container, styles.flex].join(' ')}>
            <img className={styles.logo} src="/images/logo.png" alt="Logo" />

            <div className = {styles.information}>
                <input
                    type="text"
                    onChange={(e) => debounceChange(e.target.value)}
                    placeholder="Filter food trucks"
                />

            </div>
        </div>
    )
}
