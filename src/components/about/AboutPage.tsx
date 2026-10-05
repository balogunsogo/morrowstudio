import MobileMenuDetails from '@/components/site/MobileMenuDetails'
import SiteNavigation from '@/components/home/SiteNavigation'
import type {Homepage} from '@/components/home/types'
import type {About} from './types'
import AboutHero from './AboutHero'
import AboutImages from './AboutImages'
import AboutBio from './AboutBio'
import Capabilities from './Capabilities'
import Clients from './Clients'
import Recognition from './Recognition'
import HomeFooter from '@/components/home/HomeFooter'
import styles from './About.module.scss'

export default function AboutPage({about, home}: {about: About | null; home: Homepage | null}) {
  return <div className={styles.page} id="top">
    <SiteNavigation menuDetails={<MobileMenuDetails home={home} />} title={home?.heroTitle} eyebrow={about?.eyebrow} location={home?.location} count={home?.projectIndex?.length??home?.featuredProjects?.filter(item => item.project?.slug?.current).length} />
    <main className={styles.content}>
      {about ? <>
        <AboutHero statement={about.statement} body={about.statementBody} mobileBody={about.mobileStatementBody} />
        <AboutImages primaryImage={about.primaryImage} secondaryImage={about.secondaryImage} primaryCaption={about.primaryCaption} secondaryCaption={about.secondaryCaption} />
        <AboutBio body={about.bio} mobileBody={about.mobileBio} />
        <Capabilities items={about.capabilities} details={about.capabilityItems} />
        <div className={about.mobileClients?styles.desktopCopy:undefined}><Clients items={about.clients}/></div>
        {about.mobileClients&&<div className={styles.mobileCopy}><Clients items={about.mobileClients}/></div>}
        <Recognition items={about.recognition} />
      </> : <p className={styles.empty}>About content is currently unavailable.</p>}
    </main>
    {home && <HomeFooter home={home} />}
  </div>
}
