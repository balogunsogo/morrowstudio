import type {CreditItem} from '../types'
export type {CreditItem} from '../types'

type CreditsBlockProps = {
  title?: string
  items?: CreditItem[]
}

export default function CreditsBlock({title, items}: CreditsBlockProps) {
  if (!items?.length) return null

  return (
    <section className="project-credits project-block">
      {title && <h2>{title}</h2>}
      {!!items?.length && (
        <dl>
          {items.map((item, index) => (
            <div key={item._key ?? index}>
              <dt>{item.role}</dt>
              <dd>{item.name}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
