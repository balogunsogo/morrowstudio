type QuoteBlockProps = {
  quote: string
  author?: string
  role?: string
  alignment?: 'left' | 'center'
}

export default function QuoteBlock({
  quote, author, role, alignment = 'left',
}: QuoteBlockProps) {
  return (
    <figure className="project-quote project-block" data-alignment={alignment}>
      <blockquote><p>{quote}</p></blockquote>
      {(author || role) && (
        <figcaption>
          {author && <span>{author}</span>}
          {author && role && ', '}
          {role && <span>{role}</span>}
        </figcaption>
      )}
    </figure>
  )
}
