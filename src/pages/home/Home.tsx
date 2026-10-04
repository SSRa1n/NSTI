import { Banner } from './sections/banner'
import { Introduction } from './sections/introduction'
import { GetStarted } from './sections/getstarted'
import { Quiz } from './sections/quiz'

import { Shape } from '@/components/shape/shape'

function Home() {
  return (
    <>
      <Banner />
      <Introduction />
      <GetStarted />
      <Shape color="var(--bg-secondary)"/>
      <Quiz />
    </>
  )
}

export default Home