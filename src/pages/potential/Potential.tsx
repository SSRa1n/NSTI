import Style from './potential.module.css'

import potentialImage from '@/assets/potential.webp'

function Potential() {
    return (
        <section className={Style.potential}>
            <img className={Style.potentialImage} src={potentialImage} alt="Potential" />
            <h1 className="font-bold text-center">Seek Help Nigga</h1>
        </section>
    )
}

export default Potential