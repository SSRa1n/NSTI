import Style from './scrollarrow.module.css'

type ScrollArrowProps = {
    text?: string
}

export function ScrollArrow({ text }: ScrollArrowProps) {
    return (
        <div  className={Style.scrollArrow} 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}>
            <i className="scroll-arrow bi bi-arrow-down" 
            />
            {text && 
                <p className="text-xs">
                    {text}
                </p>
            }
        </div>
    )
}