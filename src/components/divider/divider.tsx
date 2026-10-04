import Style from './divider.module.css'

type DividerProps = {
    width?: string;
    margin?: string;
};

export function Divider({width='clamp(360px, 50vw, 80vw)', margin='30px auto 30px auto'}: DividerProps) {
    return (
        <div className={Style.divider}  style={{width, margin}} />
    )
}