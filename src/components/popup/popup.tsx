import Style from './popup.module.css';

type Indicators = {
    name: string;
    trait: string;
    description: string;
    image: string;
}

type PopupProps = {
    percentage: number;
    data: Indicators;
    isOpen: boolean;
    onClose: () => void;
};

export function Popup({ percentage, data, isOpen, onClose}: PopupProps) {
    return (
        <div
            className={`${Style.overlay} ${isOpen ? Style.open : ''}`}
            onClick={onClose}
        >
            <div
                className={Style.popup}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={Style.close} onClick={onClose}>
                    <i className="bi bi-x" />
                </button>
                <h5 className="text-center uppercase tracking-widest mb-2">{data.trait}</h5>
                <h2 className="text-center font-bold">{percentage}% {data.name}</h2>
                <img src={data.image === "" ? "./web-bg.webp" : data.image} alt={data.name} className="h-40 mx-auto mb-3"/>
                <p>&emsp;{data.description}</p>
            </div>
        </div>
    );
}