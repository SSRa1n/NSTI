import Style from './banner.module.css'
import { ScrollArrow } from '@/components/scrollarrow/scrollarrow'

export function Banner() {
  return (
    <section className={Style.banner}>
        <p className="tracking-widest">NAI-SIVAKORN TYPE INDICATOR</p>
        <h1 className="font-medium leading-none tracking-wider">
          NSTI<br/>Personality Test
        </h1>
        <h3 className="font-light">Find out what kind of menace<br/>you are in the group</h3>
        <ScrollArrow />
    </section>
    )
}