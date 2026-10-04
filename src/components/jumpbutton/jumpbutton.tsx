import Style from './jumpbutton.module.css'

type ButtonProps = {
    text: string;
    icon?: React.ReactNode;
    fontSize: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
    onClick: () => void;
}

export function JumpButton({ text, icon, fontSize, onClick }: ButtonProps) {
    const TextElement = fontSize;

    return (
        <button className={Style.jumpButton} onClick={onClick}>
            <TextElement className="font-bold text-center text-aliceblue">
                {text}
            </TextElement>
            {icon && (
                <span className={Style.jumpIcon}>
                    {icon}
                </span>
            )}
        </button>
    );
}