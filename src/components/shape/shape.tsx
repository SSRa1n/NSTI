import Style from './shape.module.css';

type ShapeProps = {
    color?: string;
};

export function Shape({ color = 'rgba(64, 64, 112, 1)' }: ShapeProps) {
    return (
        <div className={Style.shape} style={{ backgroundColor: color }}></div>
    )
}