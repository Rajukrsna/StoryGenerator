"use client";

import { Navbar } from "@/components/Navbar";

const fullStory = `
Deep within the ancient kingdom of Eldoria, where towering mountains kissed the sky and rivers shimmered like liquid silver, a prophecy was whispered among the elders.
A child, born under the blood moon, would rise to either **save** or **destroy** the world.
Aric, a boy of sixteen, had spent his entire life in the quiet village of Windmere, unaware that destiny had already marked him.
One fateful evening, as Aric prepared to close his father's forge, a sudden tremor shook the village.
---
When Aric awoke, he found himself in an **endless field of stars**, weightless and unbound. The dragon stood before him, now smaller, yet no less imposing.
"You are the last Drakenborn, the one who can awaken the lost magic," the dragon said. "But your fate is undecided. Will you wield your power for creation… or destruction?"
Aric shook his head. “I don’t understand. I’m just a blacksmith’s son.”
The dragon’s fiery eyes softened. "Your bloodline is ancient, hidden among humans to protect the last remnants of our power."
---
Aric awoke in a **dark forest**, its trees twisted and gnarled like skeletal fingers. The scent of damp earth filled his lungs, and distant howls echoed through the trees.
He wasn’t alone.
A figure emerged from the shadows—a **woman clad in crimson armor**, her eyes burning with an unnatural glow.
"You should not have come here, Drakenborn," she said, her voice like the hiss of a blade being unsheathed. "The Shadow King already knows of you."
---
The world exploded in **golden flames**. Aric didn’t understand how, but the fire **obeyed his will**, wrapping around his arms like living serpents.
Lyria grinned. “Not bad. But fire alone won’t save you.”
She raised her hands, and the shadows around her **twisted**, forming a dozen dark blades. With a flick of her wrist, they flew toward him.
Aric’s instincts screamed. He **thrust his hands forward**, and the golden flames **roared to life**, colliding with the dark magic.

Deep within the ancient kingdom of Eldoria, where towering mountains kissed the sky and rivers shimmered like liquid silver, a prophecy was whispered among the elders.
A child, born under the blood moon, would rise to either **save** or **destroy** the world.
Aric, a boy of sixteen, had spent his entire life in the quiet village of Windmere, unaware that destiny had already marked him.
One fateful evening, as Aric prepared to close his father's forge, a sudden tremor shook the village.
---
When Aric awoke, he found himself in an **endless field of stars**, weightless and unbound. The dragon stood before him, now smaller, yet no less imposing.
"You are the last Drakenborn, the one who can awaken the lost magic," the dragon said. "But your fate is undecided. Will you wield your power for creation… or destruction?"
Aric shook his head. “I don’t understand. I’m just a blacksmith’s son.”
The dragon’s fiery eyes softened. "Your bloodline is ancient, hidden among humans to protect the last remnants of our power."
---
Aric awoke in a **dark forest**, its trees twisted and gnarled like skeletal fingers. The scent of damp earth filled his lungs, and distant howls echoed through the trees.
He wasn’t alone.
A figure emerged from the shadows—a **woman clad in crimson armor**, her eyes burning with an unnatural glow.
"You should not have come here, Drakenborn," she said, her voice like the hiss of a blade being unsheathed. "The Shadow King already knows of you."
---
The world exploded in **golden flames**. Aric didn’t understand how, but the fire **obeyed his will**, wrapping around his arms like living serpents.
Lyria grinned. “Not bad. But fire alone won’t save you.”
She raised her hands, and the shadows around her **twisted**, forming a dozen dark blades. With a flick of her wrist, they flew toward him.
Aric’s instincts screamed. He **thrust his hands forward**, and the golden flames **roared to life**, colliding with the dark magic.

Deep within the ancient kingdom of Eldoria, where towering mountains kissed the sky and rivers shimmered like liquid silver, a prophecy was whispered among the elders.
A child, born under the blood moon, would rise to either **save** or **destroy** the world.
Aric, a boy of sixteen, had spent his entire life in the quiet village of Windmere, unaware that destiny had already marked him.
One fateful evening, as Aric prepared to close his father's forge, a sudden tremor shook the village.
---
When Aric awoke, he found himself in an **endless field of stars**, weightless and unbound. The dragon stood before him, now smaller, yet no less imposing.
"You are the last Drakenborn, the one who can awaken the lost magic," the dragon said. "But your fate is undecided. Will you wield your power for creation… or destruction?"
Aric shook his head. “I don’t understand. I’m just a blacksmith’s son.”
The dragon’s fiery eyes softened. "Your bloodline is ancient, hidden among humans to protect the last remnants of our power."
---
Aric awoke in a **dark forest**, its trees twisted and gnarled like skeletal fingers. The scent of damp earth filled his lungs, and distant howls echoed through the trees.
He wasn’t alone.
A figure emerged from the shadows—a **woman clad in crimson armor**, her eyes burning with an unnatural glow.
"You should not have come here, Drakenborn," she said, her voice like the hiss of a blade being unsheathed. "The Shadow King already knows of you."
---
The world exploded in **golden flames**. Aric didn’t understand how, but the fire **obeyed his will**, wrapping around his arms like living serpents.
Lyria grinned. “Not bad. But fire alone won’t save you.”
She raised her hands, and the shadows around her **twisted**, forming a dozen dark blades. With a flick of her wrist, they flew toward him.
Aric’s instincts screamed. He **thrust his hands forward**, and the golden flames **roared to life**, colliding with the dark magic.
`;

export default function ReadPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex-col items-center p-10">
                <h1 className="text-5xl font-bold">The Dragon Story</h1>
                <h2 className="pl-2 text-2xl">Chapter 1</h2>
                <div className="mt-10 h-px bg-gray-300 my-4 max-w-screen-2xl mx-auto" />

                <div className="h-full sm:h-[calc(100vh-28rem)] md:h-[calc(100vh-24rem)] lg:h-[calc(100vh-20rem)] xl:h-[calc(100vh-19rem)] overflow-y-auto p-6 border rounded-lg bg-white shadow-lg">
                    <p className="text-md whitespace-pre-line">{fullStory}</p>
                </div>
            </div>
        </main>
    );
}
