'use client'
import styles from './page.module.css'
import ZoomParallax from './ZoomParralax';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'

export default function ZoomParallaxPage() {

    useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },[])

    return (
        <main className={styles.main}>
            <ZoomParallax />
        </main>
    )
}