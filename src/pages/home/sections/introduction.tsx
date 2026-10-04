import { Divider } from '@/components/divider/divider'

export function Introduction() {
    return (
        <section className="p-9 flex flex-col items-center  bg-(--bg) min-h-200"> 
            <div className="flex flex-col items-center justify-center ">
                <h1 className="font-jenevers text-center">What is NSTI?</h1>
                <h3 className="font-jenevers text-center mb-2">Down into the details</h3>
                <Divider />
            </div>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-4 sm:px-8 md:grid-cols-2 lg:gap-16 lg:px-12" style={{fontSize: "clamp(0.75rem, 1.5vw, 1.5rem)", textIndent: "1.5em"}} >
                <p>Drawing on frameworks like the Myers-Briggs Type Indicator (MBTI), 
                    which categorizes personality traits to help understand behavioural tendencies. 
                    NSTI (Nai-Sivakorn Type Indicator) was created to explore the details of group dynamics:<br/> 
                    who tends to be a yapper, who stays quietly in the background, 
                    and who naturally becomes the bully, or the group’s favourite punching bag. 
                    It also considers the less obvious sides of personality, 
                    such as being kinky or just gay, confidence, and rizz.</p>
                <p>Instead of being a fixed aspects of a person’s identity, 
                    The NSTI represent the roles people develop within a particular social circle. 
                    By exploring the way you think, act, and interact with others in a group setting,
                    the NSTI attempts to capture the personality that emerges within the group, 
                    rather than simply the personality a person presents on their own.</p>
            </div>
            <div className="w-full max-w-6xl px-4 sm:px-8 lg:px-12" style={{fontSize: "clamp(0.75rem, 1.5vw, 1.5rem)", textIndent: "1.5em"}} >
                <p className="font-jenevers text-end mt-5">Sivakorn Poometham<br/>Original Author</p>
            </div>
        </section>
    )
}