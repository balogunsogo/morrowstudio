import SiteFooter from '../site/SiteFooter'
import type {Homepage} from './types'

export default function HomeFooter({home}: {home: Homepage}) {
  return <SiteFooter heading={home.footerHeading} email={home.footerEmail} socialLinks={home.socialLinks} location={home.footerLocation} brand={home.heroTitle} generalEmail={home.generalEmail} studioHours={home.studioHours} />
}
