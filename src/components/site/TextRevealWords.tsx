import {Children, cloneElement, isValidElement, type ReactNode} from 'react'
import styles from './TextReveal.module.scss'

export default function TextRevealWords({children}: {children: ReactNode}) {
  return <>{Children.map(children, child => {
    if (typeof child === 'string') return child.split(/(\s+)/).map((part, index) =>
      !part.trim() ? part : <span className={styles.mask} key={index}><span className={styles.word} data-reveal-word>{part}</span></span>,
    )
    if (isValidElement<{children?: ReactNode}>(child) && child.props.children !== undefined) {
      return cloneElement(child, undefined, <TextRevealWords>{child.props.children}</TextRevealWords>)
    }
    return child
  })}</>
}
