import Style from './personality.module.css'

import { Divider } from '@/components/divider/divider'

type PersonalityData = {
    "personality_type": string,
    "name": string,
    "description": string
}

export function Personality({ personality }: { personality?: PersonalityData }) {
    return (
        <section className={Style.personality}>
           <Divider />
           <h3 className="font-light text-center tracking-widest mt-25">Y O U&nbsp;&nbsp;&nbsp;A R E</h3>
           <h1 className={Style.textbanner}>{personality?.name || "Loading..."}</h1>
           <h3 className={"font-bold text-center mt-3 tracking-widest mb-25"}>{personality?.personality_type.split('').join(' ') || "Loading..."}</h3>
           <Divider />
           <i className="scroll-arrow bi bi-arrow-down" 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            />
            
        </section>
    )
}