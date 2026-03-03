'use client'

import Link from 'next/link'
import { CalendarX, Home, FileText, ArrowRight } from 'lucide-react'
import { Navbar } from '../src/components/home/Navbar'
import { Footer } from '../src/components/home/Footer'
import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className={styles.container}>
                {/* Background Decorative Elements (Blobs Animados) */}
                <div className={styles.backgroundBlobs}>
                    <div className={styles.blob1}></div>
                    <div className={styles.blob2}></div>
                    <div className={styles.blob3}></div>
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.fadeIn}>
                        {/* 404 Code & Icon */}
                        <div className={styles.numberContainer}>
                            <h1 className={styles.number404}>
                                404
                            </h1>
                            <div className={styles.iconWrapper}>
                                <CalendarX className={styles.icon} />
                            </div>
                        </div>

                        {/* Message */}
                        <div className={styles.textContainer}>
                            <h2 className={styles.title}>
                                Ops! Este dia não está no calendário.
                            </h2>
                            <p className={styles.description}>
                                Parece que você encontrou um feriado que não existe (ou uma página que sumiu).
                                Não se preocupe, vamos te ajudar a encontrar o caminho de volta.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionsContainer}>
                            <Link href="/" className={styles.primaryButton}>
                                <Home className={styles.buttonIcon} />
                                <span>Voltar para o Início</span>
                            </Link>

                            <Link href="https://feriadosapi.com/docs" className={styles.secondaryButton}>
                                <FileText className={styles.buttonIcon} />
                                <span>Consultar Documentação</span>
                                <ArrowRight className={`${styles.buttonIcon} ${styles.arrowIcon}`} />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
