import Style from './line.module.css'

type LineProps = {
    color?: string;
    thin?: boolean;
};

export function Line({ color = 'aliceblue', thin = false }: LineProps) {
    return (
        <div className={thin ? Style.lineThin : Style.line} 
             style={{ backgroundColor: color }} />
    )
}