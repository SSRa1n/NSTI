type CardProps = {
    title: string;
    description: string;
    image: string;
};

export function Card({ title, description, image }: CardProps) {
    return (
        <div className="flex flex-col gap-2 lg:w-1/5 sm:w-3/4 items-center border-3 border-[rgba(240,248,255,0.5)] rounded-4xl shadow-md p-4 min-h-100 bg-[rgba(240,248,255,0.2)]">
            <img src={image} alt={title} className="w-full rounded-lg" />
            <h4 className="text-center mt-2">{title}</h4>
            <p className="text-center text-[rgba(240,248,255,0.8)]">{description}</p>
        </div>
    );
}