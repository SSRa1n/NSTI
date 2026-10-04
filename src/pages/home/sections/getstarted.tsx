import { Card } from '@/components/card/card'
import { Divider } from '@/components/divider/divider'
import card1Image from '@/assets/card-1.webp'
import card2Image from '@/assets/card-2.webp'
import card3Image from '@/assets/card-3.webp'

export function GetStarted() {
    return (
        <section className="px-9 pb-9 flex flex-col items-center justify-center bg-[linear-gradient(var(--bg),var(--bg-secondary))]">
            <div className="flex flex-col items-center justify-center ">
                <h1 className="text-center">Get Started</h1>
                <h3 className="text-center">Discover your personality by completing the test</h3>
                <Divider />
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col items-center justify-center gap-5 mt-5">
                <Card 
                    title="Complete the test" 
                    description="Be yourself, answer honestly, the FEDs ain't watching, and find out your group chat's personality." 
                    image={card1Image} />
                <Card 
                    title="View Detailed Results" 
                    description="Learn how your personality type influences the group chat." 
                    image={card2Image} />
                <Card 
                    title="Unlock Your Potential" 
                    description="Evolve into the piece of shit you want to be with no going back." 
                    image={card3Image} />
            </div>
        </section>
    )
}