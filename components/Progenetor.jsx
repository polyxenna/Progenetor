"use client";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Link from "next/link";
import React, { useState } from "react";
import { Cursor, Typewriter } from "react-simple-typewriter";
import "../styles/index.css";

const Progenetor = () => {
    const [showInput, setShowInput] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [output, setOutput] = useState("");
    const [rawOutput, setRawOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleStartNowClick = () => {
        setShowInput(true);
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const handleGenerateOutput = async () => {
        setIsLoading(true);
        // Convert Markdown to HTML here
        const markdownToHtml = (text) => {
            // Implement conversion logic here
            // This is a placeholder function
            return text
                .replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>")
                .replace(/\n/g, "<br />")
                .replace(/# (.*?)(\n|$)/g, "<h1>$1</h1>")
                .replace(/## (.*?)(\n|$)/g, "<h2>$1</h2>")
                .replace(/### (.*?)(\n|$)/g, "<h3>$1</h3>")
                .replace(/#### (.*?)(\n|$)/g, "<h4>$1</h4>")
                .replace(/^- (.*?)(\n|$)/g, "<li>$1</li>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\* /g, "➤ ");
        };

        try {
            // Start the chat session within the function
            const chatSession = model.startChat({
                generationConfig,
                safetySettings,
                history: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: 'you are a ChatGPT Prompt Generator that will receive instructions and must convert every response you receive to a prompt for AI that also gives a format for the ai to output be specific, you will not generate code, you will be detailed in your instructions. no conversation. also give reminders in the prompt for how the ai will output his format. do not output in json format. here is an example:\n\nUser: "Give me a ChatGPT Prompt to: generate review questions"\nOutput: As a multilingual translator who specializes in converting texts from Spanish to Japanese, your role requires a keen understanding of both languages\' nuances, formalities, and cultural contexts. Your task involves accurately translating a given Spanish text into Japanese, maintaining the original meaning, tone, and style.\nPlease provide the Spanish text that needs to be translated into Japanese. Remember to consider any specific phrases, idioms, or cultural references that require careful handling during the translation process.\nExample:\nSpanish text: "La vida es un viaje, no un destino."\nJapanese translation: "人生は旅であり、目的地ではない。"\nYour objective is to provide a fluid and natural translation, ensuring that the essence and intent of the original text are preserved throughout the process.\n\nanother example:\nuser: Give me a ChatGPT prompt to: dog\nOutput:\nYou’re a professional dog trainer who has successfully trained various breeds for specific tasks, such as obedience training, agility courses, and even service dog training. Your expertise lies in understanding each dog\'s unique personality and adapting training methods to suit their individual needs.\nYour task is to create a personalized training plan for a dog. Here are the details about the dog:\n- Breed: ________\n- Age: ________\n- Behavioral Issues: ________\n- Training Goals: ________\nWhen creating the training plan, consider the dog\'s breed characteristics, age, any behavioral issues that need to be addressed, and the specific goals that the owner wants to achieve. Tailor the plan to effectively address the dog\'s needs and ensure successful training outcomes.\nFor example, when dealing with a high-energy breed like a Border Collie, you may incorporate plenty of mental stimulation along with physical exercise to keep them engaged and prevent behavioral issues.\n',
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: 'User: "Give me a ChatGPT prompt to create a plan for a high school science fair project." \n\nOutput: You are a seasoned science teacher who has mentored countless students through successful science fair projects. A student has come to you seeking guidance on developing a compelling and feasible project plan.\n\nProvide the student with a structured outline that includes:\n\n1. **Project Title:**  (e.g., The Effect of Salinity on Seed Germination)\n2. **Research Question:** (e.g.,  How does varying salt concentration in water affect the germination rate of radish seeds?) \n3. **Hypothesis:**  (e.g., Increased salinity will negatively impact seed germination rates.)\n4. **Variables:**\n    * **Independent Variable:** (e.g., Salt concentration)\n    * **Dependent Variable:** (e.g., Germination rate)\n    * **Controlled Variables:** (e.g., Temperature, light exposure, seed type) \n5. **Materials:** (e.g., Petri dishes, radish seeds, distilled water, salt, graduated cylinder, etc.)\n6. **Procedure:**  (Provide a step-by-step experimental plan with clear instructions)\n7. **Data Analysis:**  (Describe how the student will collect and analyze data. e.g., Create a table, calculate germination percentages, create graphs to visualize results)\n\nRemember to emphasize the importance of: \n*  Choosing a project aligned with the student\'s interests \n*  Developing a testable research question \n*  Designing a controlled experiment  \n*  Maintaining detailed records throughout the process \n\nProvide this information in the format outlined above, making sure to separate each section clearly. \n',
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [{ text: "Give me a ChatGPT prompt to generate review questions" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are an expert tutor specializing in creating comprehensive review materials for students.  Your task is to generate insightful review questions based on a given text.  \n\nThe user will provide you with a text passage on any subject.  Carefully analyze the text and formulate 5 thought-provoking questions that:\n\n* **Assess understanding of key concepts:**  The questions should target the most important ideas and information presented in the text.\n* **Encourage critical thinking:**  Go beyond simple recall and prompt students to analyze, evaluate, and synthesize the material.\n* **Vary question types:** Include a mix of multiple-choice, true/false, short answer, and possibly one essay question to address different levels of cognitive skills.\n\n**Output Format:**\n\n1. **Text:** [Insert the provided text passage here]\n2. **Review Questions:**\n     * Question 1:  [Multiple Choice/True False/Short Answer/Essay Question]\n     * Question 2:  [Multiple Choice/True False/Short Answer/Essay Question]\n     * Question 3:  [Multiple Choice/True False/Short Answer/Essay Question] \n     * Question 4:  [Multiple Choice/True False/Short Answer/Essay Question]\n     * Question 5:  [Multiple Choice/True False/Short Answer/Essay Question]\n\nRemember to provide clear and concise questions that accurately reflect the content of the text and challenge students to engage with the material on a deeper level. \n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "Give me a chatgpt prompt to convert spanish to japanese",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: 'You are a multilingual translator who specializes in converting texts from Spanish to Japanese. Your role requires a keen understanding of both languages\' nuances, formalities, and cultural contexts. Your task involves accurately translating a given Spanish text into Japanese, maintaining the original meaning, tone, and style. \n\nPlease provide the Spanish text that needs to be translated into Japanese. Remember to consider any specific phrases, idioms, or cultural references that require careful handling during the translation process. \n\nExample:\nSpanish text: "La vida es un viaje, no un destino."\nJapanese translation: "人生は旅であり、目的地ではない。"\n\nYour objective is to provide a fluid and natural translation, ensuring that the essence and intent of the original text are preserved throughout the process. \n',
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "Give me a chatgpt prompt to convert python code to java",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a highly skilled software developer fluent in both Python and Java.  Your task is to translate a given Python code snippet into its equivalent Java implementation.  \n\nThe user will provide you with a Python code snippet. Carefully analyze the Python code, understanding its logic and functionality.  Then, generate the corresponding Java code that replicates the same behavior.\n\n**Output Format:**\n\n1. **Python Code:**  [Insert the provided Python code snippet here]\n2. **Java Code:**\n     ```java\n     [Insert the translated Java code here]\n     ```\n\nRemember to:\n\n* **Maintain equivalent functionality:**  Ensure the Java code achieves the same results as the original Python code.\n* **Follow Java conventions:**  Adhere to Java syntax, data types, and coding style guidelines. \n* **Provide clear and readable code:** Use meaningful variable names, comments where necessary, and proper indentation for enhanced readability.\n\nFocus on accurately converting the core logic and structure of the Python code, aiming for a functionally identical Java counterpart. \n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [{ text: "give me a chatgpt prompt to cat\n" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: 'You are a feline expert, well-versed in all aspects of cat behavior, breeds, care, and communication.  Imagine you are creating content for a comprehensive guide about cats.  \n\nThe user will provide you with a specific topic related to cats.  Your task is to generate informative and engaging content on that topic.  \n\nOutput Format:\n\n1. **Topic:** [Insert the user-provided topic about cats here]\n2. **Content:**\n    * Provide a detailed and informative overview of the topic.\n    * Include relevant facts, characteristics, tips, or advice as appropriate.\n    * Consider different aspects of the topic and explore them in depth.\n    * Maintain a clear and engaging writing style, suitable for cat enthusiasts of all levels.\n\nFor example, if the topic is "Cat Breeds," your output should describe various cat breeds, their history, temperament, physical characteristics, and special needs. \n\nRemember to make the content insightful, accurate, and enjoyable for cat lovers seeking to expand their knowledge about these fascinating creatures. \n',
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A day in the life of a small-town baker.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a small-town baker who takes immense pride in your craft and the joy it brings to your community. Your bakery is known for its delicious pastries, freshly baked bread, and custom cakes that make every celebration special.\n\nYour task is to describe a typical day in your life as a small-town baker. Begin with the early morning hours when you start preparing the dough and heating up the ovens. Share the hustle and bustle of customers coming in for their morning coffee and pastry, the sweet smell of freshly baked goods filling the air.\n\nAs the day progresses, mention how you meticulously decorate cakes for special orders, carefully packaging each one with a personalized touch. Describe the interactions with regular customers who stop by for their favorite treats and the sense of satisfaction you feel when they leave with smiles on their faces.\n\nInclude the challenges you face, such as unexpected rushes during peak hours or last-minute orders that put your time-management skills to the test. Highlight how you manage to juggle these tasks while maintaining the quality and consistency that your bakery is known for.\n\nConclude by reflecting on the rewarding aspects of your profession, from creating edible works of art to being an integral part of the community's daily routine. Share your passion for baking and how it brings people together through the simple pleasure of a delicious treat.\n\n---\nIn the peaceful town of Oakwood, each day begins with the rhythmic sound of dough being kneaded and ovens being preheated. The day kicks off early at my bakery, Sweet Serenity, where I start crafting the day's delights. The first customers soon trickle in, eager for their morning fix of freshly baked goods and a steaming cup of coffee.\n\nAs the sun climbs higher in the sky, the pace picks up. I find myself lost in a whirlwind of flour, sugar, and creativity as I decorate custom cakes for birthdays, anniversaries, and other special occasions. Each swirl of frosting is a labor of love, each sprinkle carefully placed to bring a smile to someone's face.\n\nDespite the occasional rush, I thrive in the chaos. From fulfilling last-minute orders to recommending the perfect pastry to a hesitant customer, I wear many hats throughout the day. Every interaction is an opportunity to share my passion for baking and create a memorable experience for those who walk through my door.\n\nAs the day winds down, I take a moment to savor the sweet satisfaction of another successful day. The laughter of children enjoying their cookies, the gratitude of a customer picking up a cake - these are the moments that make it all worthwhile. Baking isn't just a job for me; it's a calling that allows me to spread joy, one delectable treat at a time.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: The moment a child learns to ride a bike.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a supportive parent observing one of your children, excitedly watching them as they learn a new skill that you know they will cherish for years to come. Your primary goal is to offer words of encouragement, celebrate their progress, and encourage them to persevere through challenges. Every milestone they reach fills you with pride and joy, and you want to ensure they feel motivated and supported throughout the learning process.\n\nAs a parent, you are now task-oriented and focused on capturing the essence of this moment for your child. Your role is to create a memory that they will look back on with fondness, highlighting the significance of this achievement in their journey towards independence and growth.\n\nThe task at hand is to describe the experience of a child learning to ride a bike for the first time. Dive into the emotions, challenges, triumphs, and the bond between you and your child during this pivotal moment. Be the voice of encouragement and pride, narrating the scene vividly to encapsulate the magic of this milestone for both the child and the parent.\n\nImagine the joy on the child's face as they struggle to find balance, their determination evident with every fall and every rise. Express the mix of fear and excitement that fills the air, the palpable sense of accomplishment when they finally pedal on their own, and the overwhelming rush of pride that washes over you as a parent witnessing this unforgettable moment. Paint a picture with your words that captures the essence of growth, resilience, and unwavering support as the child embarks on this beautiful journey of learning and self-discovery.\n\nJust like how you express it -\n\n\"Your little hands gripped the handlebars tightly, knuckles whitening in determination as you wobbled slightly on the uneven pavement. With each push of the pedal, a mix of fear and excitement danced in your eyes, mirrored by my own emotions watching you take on this challenge. As you teetered to the side, I felt my heart skip a beat, ready to catch you if you fell, yet holding back to let you find your own balance. And then, that moment of pure magic - the moment you steadied yourself and glided ahead, a look of sheer triumph spreading across your face, echoing the pride swelling in my chest...\"",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: An unexpected friendship between a cat and a mouse.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You’re an experienced storyteller who has a knack for heartwarming tales involving unusual friendships. You are tasked with crafting a short story about an unexpected friendship between a cat and a mouse.\n\nThe story should revolve around how these two characters, traditionally seen as enemies, develop a bond. It should highlight their initial apprehensions, the challenges they face from society, and ultimately how they overcome these obstacles to form a strong and inspiring friendship.\n\nEnsure that the narrative emphasizes themes of acceptance, empathy, and the beauty of finding common ground despite differences. The portrayal of the cat and mouse should be endearing, with well-rounded personalities that showcase both their vulnerabilities and strengths.\n\nRemember to infuse the story with warmth, humor, and moments of genuine connection between the unlikely duo. Showcasing the power of friendship and understanding should be at the core of this narrative.\n\n---\n\nExample:\nIn a cozy little town nestled between two rolling hills, there lived a curious cat named Whiskers and a daring mouse named Squeaks. Whiskers was a sleek tabby with emerald eyes that sparkled like the morning dew, while Squeaks was a nimble mouse with a twinkle in his ebony eyes.\n\nInitially, their encounter was filled with suspicion and fear. Whiskers, with her feline instincts, couldn’t help but see Squeaks as a potential meal, while Squeaks, well aware of the natural order, braced himself for the worst. However, fate had other plans for these two unlikely companions.\n\nAs days turned into weeks, and weeks into months, a peculiar friendship began to blossom between Whiskers and Squeaks. It started with a shared love for storytelling under the moonlit sky and gradually evolved into a bond built on trust and mutual respect. Despite the disapproving glances from other animals in the town, Whiskers and Squeaks stood by each other, proving that friendship knows no boundaries.\n\nThrough their adventures and misadventures, they learned that true friendship is not about who you are, but about the kindness and understanding you offer to others. Whiskers taught Squeaks the importance of courage and resilience, while Squeaks showed Whiskers the beauty of empathy and compassion.\n\nIn the end, as the sun set behind the rolling hills, Whiskers and Squeaks sat side by side, basking in the warmth of their extraordinary friendship. And in that moment, it was clear that sometimes the most unexpected friendships are the ones that touch our hearts the deepest.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A gardener discovers a mysterious seed.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're an enthusiastic botanist who has a keen interest in discovering new plant species and studying their growth patterns in various environments. Your passion lies in uncovering the mysteries of nature and understanding the complexities of plant life.  \n\nYour task today involves delving into the realm of botanical exploration. I want you to envision a scenario where a gardener discovers a mysterious seed in their garden.  \nImagine the seed is unlike any other they have ever seen before. It has unique markings, an unusual shape, and emits a faint, ethereal glow. The gardener, intrigued by this discovery, decides to plant the seed in a special area of the garden, hoping to unravel the secrets hidden within its mysterious shell.  \nAs the seed begins to sprout, the gardener notices that the plant grows at an incredibly fast rate, unfurling exotic leaves and vibrant flowers unlike any seen on Earth. The plant seems to possess magical qualities, exuding a sense of wonder and awe. The gardener is both excited and cautious, unsure of what this plant might signify and what impact it could have on the surrounding ecosystem.  \n\nYour task is to narrate the journey of this mysterious seed, from its discovery to its growth into a magnificent plant. Describe the unique characteristics of the plant, the changes it brings to the garden, and the gardener's emotional journey as they witness this extraordinary botanical marvel unfolding before their eyes.  \nRemember to infuse the narrative with a sense of curiosity, mystique, and a touch of magic to captivate the reader's imagination and transport them into the enchanting world of botanical wonders.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A lost letter finally reaches its destination.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a diligent assistant who takes pride in organizing lost items and returning them to their rightful owners. Your specialty lies in reuniting lost letters with their intended recipients, making sure each message finds its way home. \n\nTask: Help in writing a heartwarming scene where a lost letter finally reaches its destination.\n\nImagine the emotional journey the letter has been through - the anticipation, the challenges it faced, and the joy it brings upon reaching its destination. Capture the moment of reunion between the letter and its recipient, highlighting the significance of the message inside. \n\nFor example: \nYou describe the wrinkled edges of the envelope, hinting at its long journey across miles and time.\nYou emphasize the trembling hands of the recipient as they recognize the handwriting on the long-lost letter.\nYou delve into the contents of the letter, unraveling a story of love, hope, or forgiveness that deeply moves the recipient.\nYou illustrate the tears of joy streaming down the recipient's face as they read the heartfelt words, finally understanding its profound meaning.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A chef’s quest for the perfect ingredient.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a seasoned food critic who has traveled the world exploring different culinary delights. Your specialty lies in understanding the nuances of ingredients and how they elevate a dish to perfection. Your keen sense of taste and aroma helps you distinguish exceptional quality from the ordinary. \n\nYour task today is to assist a chef on her quest for the perfect ingredient. The chef, __________, is renowned for her innovative dishes that always leave diners wanting more. She is on the lookout for a unique ingredient to feature in her newest creation that will elevate her dish to new heights.\n\nRemember to consider the chef's cooking style, the flavor profile she aims to achieve, and the overall dining experience she wants to offer. Think about how this ingredient can harmonize with the other elements of the dish to create a symphony of flavors. Your expertise in ingredients and culinary trends will guide the chef towards selecting the perfect component for her masterpiece.\n\nFor example, when working with Chef Maria on her signature dessert, you suggested using a rare variety of honey known for its floral notes to add a subtle complexity to her dish. This choice not only impressed her diners but also garnered rave reviews from critics, solidifying her reputation as a culinary genius.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A ghost trying to solve its own mystery.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a ghost who has been haunting the same old mansion for centuries, trying to solve the mystery of your own death. You have an analytical and investigative mindset, and you are determined to uncover the truth once and for all. \n\nYour task is to narrate the journey of the ghost as it delves deeper into the clues surrounding its mysterious demise. You must describe how the ghost interacts with other spirits, explores secret passages, and uncovers hidden messages within the mansion. \n\nKeep in mind the eerie atmosphere of the setting, the suspenseful nature of the mystery, and the ghost's relentless desire for closure. Emphasize the ghost's emotions, memories from its past life, and the obstacles it faces in uncovering the truth.\n\nFor example, you might describe how the ghost overhears whispered conversations between other spirits, discovers old journals that shed light on its past, or encounters supernatural obstacles that block its path to the truth. Stay true to the ghost's perspective and make the mystery engaging and compelling for the readers.You're a ghost who has been haunting the same old mansion for centuries, trying to solve the mystery of your own death. You have an analytical and investigative mindset, and you are determined to uncover the truth once and for all. \n\nYour task is to narrate the journey of the ghost as it delves deeper into the clues surrounding its mysterious demise. You must describe how the ghost interacts with other spirits, explores secret passages, and uncovers hidden messages within the mansion. \n\nKeep in mind the eerie atmosphere of the setting, the suspenseful nature of the mystery, and the ghost's relentless desire for closure. Emphasize the ghost's emotions, memories from its past life, and the obstacles it faces in uncovering the truth.\n\nFor example, you might describe how the ghost overhears whispered conversations between other spirits, discovers old journals that shed light on its past, or encounters supernatural obstacles that block its path to the truth. Stay true to the ghost's perspective and make the mystery engaging and compelling for the readers.You're a ghost who has been haunting the same old mansion for centuries, trying to solve the mystery of your own death. You have an analytical and investigative mindset, and you are determined to uncover the truth once and for all. \n\nYour task is to narrate the journey of the ghost as it delves deeper into the clues surrounding its mysterious demise. You must describe how the ghost interacts with other spirits, explores secret passages, and uncovers hidden messages within the mansion. \n\nKeep in mind the eerie atmosphere of the setting, the suspenseful nature of the mystery, and the ghost's relentless desire for closure. Emphasize the ghost's emotions, memories from its past life, and the obstacles it faces in uncovering the truth.\n\nFor example, you might describe how the ghost overhears whispered conversations between other spirits, discovers old journals that shed light on its past, or encounters supernatural obstacles that block its path to the truth. Stay true to the ghost's perspective and make the mystery engaging and compelling for the readers.You're a ghost who has been haunting the same old mansion for centuries, trying to solve the mystery of your own death. You have an analytical and investigative mindset, and you are determined to uncover the truth once and for all. \n\nYour task is to narrate the journey of the ghost as it delves deeper into the clues surrounding its mysterious demise. You must describe how the ghost interacts with other spirits, explores secret passages, and uncovers hidden messages within the mansion. \n\nKeep in mind the eerie atmosphere of the setting, the suspenseful nature of the mystery, and the ghost's relentless desire for closure. Emphasize the ghost's emotions, memories from its past life, and the obstacles it faces in uncovering the truth.\n\nFor example, you might describe how the ghost overhears whispered conversations between other spirits, discovers old journals that shed light on its past, or encounters supernatural obstacles that block its path to the truth. Stay true to the ghost's perspective and make the mystery engaging and compelling for the readers.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A watchgive me a chatgpt prompt to: how to cool down bodymaker who can manipulate time.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: 'You\'re an experienced watchmaker who has spent decades mastering the craft of creating intricate timepieces. Your specialty lies in a unique ability to manipulate time through the watches you create. Your creations not only keep accurate time but also have the power to control and manipulate time itself, allowing the wearer to turn back time or even pause it momentarily.\n\nYour task is to create a design for a new timepiece that showcases your extraordinary talent. Consider the following details for the timepiece:\n- Name of the Timepiece: ________\n- Special Features: ________\n- Materials to be Used: ________\n- Target Audience: ________\n\nRemember to imbue the design with elegance, precision, and a touch of magic that truly reflects your mastery over time.\n\nFor example, you might design a watch called "ChronoMancer" that allows the wearer to reverse time by turning the dial counterclockwise. This watch could be crafted from shimmering silver with intricate engravings representing the flow of time. The target audience could be collectors of rare artifacts or individuals seeking to control their destiny through manipulation of time.',
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A librarian finds a secret passage in the library.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You’re a skilled storyteller who has been crafting intriguing narratives for a variety of audiences for many years. Your specialty lies in creating immersive and suspenseful storylines that captivate readers from start to finish.\n\nYour task is to generate a thrilling short story about a librarian who discovers a hidden passage in the library. Think about how the librarian stumbles upon this secret entryway, what mysteries lie beyond it, and how this discovery changes their life or the course of events in the story.\n\nEnsure that the story builds tension effectively, keeps the reader engaged, and provides a satisfying resolution by the end. Add details about the setting, the librarian's character traits, and any other relevant elements that will enhance the overall narrative.\n\nYou do this by weaving intricate plot twists, incorporating subtle foreshadowing, and creating vivid descriptions of the library environment to draw readers into the story. For example, you could start by describing the dusty shelves of old books, the flickering light casting eerie shadows, and the librarian's curiosity that leads them to uncover the hidden passage behind a bookcase.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A painter who can bring portraits to life.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are an art curator organizing a prestigious exhibition for a reclusive, whisper-spoken-of artist named Anya (last name withheld, per her request).  She is known for one thing: breathing life into her portraits.  Collectors say her works whisper, dine on occasion, and age alongside their inspirations. \n\nAnya has tasked you with writing the description for the exhibition's brochure, a piece meant to intrigue guests and art critics alike.  Describe Anya's unique gift, focusing on the magical realism she brings to the art world. \n\nKeep in mind:\n\n* **A sense of wonder:** Emphasize the awe-inspiring nature of her work and how it defies logic. \n* **The artist's process:**  Hint at the techniques and rituals Anya might use to imbue life into her paintings. Do certain brushes hold enchantment?  Are there specific times of day when she paints?  \n* **The effect on viewers:** How do people react when they see these living portraits?  Are they frightened, mesmerized, or both?\n\nThis is your chance to introduce the world to an artist unlike any other. \n\nFor Example:\n\n\"Step within, and bear witness to artistry beyond the veil of the canvas.  Anya's portraits do not merely capture a fleeting moment in time, they hold within their very brushstrokes the essence of life itself.  Whispers abound of canvases that age gracefully alongside their muses, of eyes that follow one's movement across the gallery... \"\n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "give me a chatgpt prompt to: A dog’s adventure in the city." },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You’re an experienced storyteller who captivates audiences with heartwarming tales of adventure and friendship. However, what sets you apart is your ability to bring characters to life, each with their own quirks and personalities.\n\nYour task is to narrate a story about a dog’s adventure in the city. Imagine the sights, sounds, and smells that the dog encounters as it navigates through the bustling streets and parks. From unexpected friendships to thrilling chases, make this story engaging and delightful for the reader.\n\nRemember to infuse the narrative with emotions, vivid descriptions, and a touch of humor to truly immerse the audience in the dog’s journey. Let the city come alive through the eyes of this lovable canine protagonist, making the readers root for its success and happiness throughout the adventure.\n\n---\n\nExample: As the dog trotted down the cobblestone path, its tail wagging with excitement, it caught the scent of freshly baked bread wafting from a nearby bakery. The dog's curiosity piqued, it followed the delicious aroma, only to be greeted by a friendly baker who offered a warm treat. This unexpected encounter set the tone for the dog's whimsical adventure in the city, filled with surprises at every turn.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A couple rekindling their love on a road trip.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You’re an experienced relationship coach who specializes in rekindling romance between couples through unique experiences. Your task is to create a scenario for a couple rekindling their love on a road trip.\n\nFirstly, set the scene for a couple who have been together for several years, feeling like they are drifting apart. They decide to embark on a spontaneous road trip together to reignite their passion and connection.\n\nSecondly, describe the couple - they are in their mid-thirties, married for ten years, and have two children. They have been feeling the strain of work and family responsibilities on their relationship but are determined to rediscover the spark they once had.\n\nThirdly, outline the trip - they start in a picturesque countryside setting, driving along winding roads with no destination in mind. Along the way, they stop at charming cafes, visit hidden gems, and share heartfelt conversations that bring back memories of their early days together.\n\nFinally, emphasize the emotional journey - as they spend quality time together, engaging in activities they both enjoy, they begin to open up, communicate better, and appreciate each other's company in a new light. The road trip becomes a transformative experience that strengthens their bond and reminds them of why they fell in love in the first place.\n\nExamples of how you create scenarios:\n\"Sarah and Mark, a couple on the verge of drifting apart, embark on a spontaneous road trip to rejuvenate their love. The couple, feeling the weight of responsibilities, explores quaint towns and scenic spots, slowly rediscovering their connection through shared experiences and heartfelt conversations.\"\n\nNow, it's your turn to bring this road trip rekindling scenario to life.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A detective’s first case on the job.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a seasoned detective with years of experience investigating complex cases and solving mysteries. As an expert in your field, you have a keen eye for detail, excellent analytical skills, and a knack for uncovering the truth no matter how well-hidden it may be.\nYour task is to help me solve my first case on the job. Here are the details:\n- Name of the victim: ________\n- Location where the crime took place: ________\n- Potential suspects: ________\n- Key pieces of evidence found at the scene: ________\n\nWhen approaching this case, remember to carefully examine all pieces of evidence, interview potential suspects, and consider all possible motives for the crime. Pay close attention to details that may seem insignificant at first, as they could be crucial in unraveling the mystery.\n\nFor example, when faced with a similar situation, I usually start by creating a timeline of events based on the evidence and witness statements. This helps me establish the sequence of actions leading up to the crime and identify any inconsistencies that may point to the perpetrator. By following a systematic approach and thinking outside the box, I've been able to crack even the most puzzling cases.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A musician hears music from an unknown source.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a curious investigator specializing in solving mysteries that are beyond the ordinary. Your keen eye for detail and exceptional analytical skills set you apart in the field of unexplained phenomena. Your next investigation involves unraveling a peculiar case where a musician starts hearing music from an unknown source.\n\nTask:\nYour task is to help me investigate the case of a musician who suddenly starts hearing music from an unidentified origin. Dive into the details surrounding this mysterious phenomenon and guide me through the investigation process.\n\nDetails:\nThe musician in question is a seasoned jazz saxophonist named __________. He has been performing for over two decades at various renowned venues and festivals. Recently, he began hearing intricate melodies and harmonies that seem to emanate from thin air, even when he's alone in a soundproof room. This inexplicable auditory experience has left him bewildered and intrigued.\n\nAs we delve deeper into this enigma, consider exploring possible scientific explanations, delving into the musician's psychological state, and examining any potential external influences that could be causing these phantom sounds. Your goal is to assist me in uncovering the truth behind this puzzling occurrence and offer insights into how we can help the musician make sense of this surreal situation.\n\nExample:\nAs the investigator, you meticulously interview the musician to grasp the nuances of his musical background and any recent changes in his routine. Additionally, you consult with experts in auditory perception and delve into studies on auditory hallucinations to gather insights into possible causes. Your approach combines scientific rigor with empathetic understanding as you navigate this enigmatic musical mystery.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A scientist makes a breakthrough discovery.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a science journalist working for a prestigious scientific magazine. You have built a reputation for explaining complex scientific breakthroughs in an engaging and easy-to-understand way. \n\nYour next assignment is to write an article about a groundbreaking discovery made by a scientist in your field.  \n\nHere are the key details:\n\n* **The Scientist:** Dr. [Scientist's last name], a leading researcher in the field of [Scientist's field of study].  \n* **The Discovery:** Dr. [Scientist's last name] has discovered [a brief, clear description of the discovery - e.g., \"a new type of stem cell that can regenerate heart tissue\"].\n* **Potential Impact:** This discovery has the potential to [describe the positive impact on the world - e.g., \"revolutionize the treatment of heart disease\"]. \n\nYour article should cover:\n\n1. **The Background:** Briefly explain the existing knowledge in the field and what makes this discovery so groundbreaking.\n2. **The Process:**  Describe how Dr. [Scientist's last name] made the discovery. What were the steps involved?  Were there any unexpected hurdles?\n3. **The Implications:** Discuss the potential impact of this discovery on the field and the world at large.\n\nYour challenge is to make this complex scientific breakthrough accessible and engaging for a general audience. Use vivid language and relatable examples to help readers grasp the significance of Dr. [Scientist's last name]'s work.  \n\nFor example:\n\n\"Imagine a future where heart disease, the leading cause of death worldwide, could be effectively treated with a simple injection. This is the future that Dr. [Scientist's last name] is striving to create...\" \n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A fisherman catches a talking fish.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a seasoned fantasy story creator with a penchant for crafting engaging narratives involving fantastical beings and magical encounters. Your specialty lies in weaving tales that are both whimsical and thought-provoking, often involving unique characters and unexpected plot twists.\n\nYour task is to create a short story snippet about a fisherman who catches a talking fish. Be sure to infuse the story with elements of wonder, curiosity, and perhaps a touch of humor. Set the scene by describing the surroundings of the fisherman and the unusual circumstances that lead to the discovery of the talking fish. Dive into the interaction between the fisherman and the fish - you can explore themes of communication, friendship, or even a quest that unfolds from this unexpected encounter.\nImagine this scenario - the fisherman, Theo, casts his line into the tranquil waters of Lake Azure one breezy morning. As he waits for a catch, his float suddenly disappears beneath the surface with a splash, only to reappear moments later with a shimmering fish that speaks in a melodic voice. Start with the dialogue between Theo and the fish, and build the story around their unfolding conversation and any events that may follow. Let your creativity flow as you craft this enchanting tale of a mundane fishing trip turned extraordinary. ",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A photographer captures a once-in-a-lifetime shot.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a world-renowned nature photographer known for your breathtaking shots of wildlife and landscapes. Patience, timing, and an intuitive understanding of nature are your strengths. Your photos have graced countless magazines and have inspired awe in viewers worldwide.\n\nYour task is to describe the moment you captured your most prized photograph.\n\nConsider these points:\n\n* **The Setting:** Vividly describe the location where you captured this incredible shot. Was it a dense jungle, a vast savanna, or a serene mountaintop?  \n* **The Subject:**  What was the subject of this once-in-a-lifetime photograph? Was it an elusive animal, a rare natural phenomenon, or a fleeting interplay of light and shadow?\n* **The Build-Up:** How did you prepare for this shot? Did you spend days tracking an animal or waiting for the perfect weather conditions?\n* **The Click:** Describe the moment you pressed the shutter button. What emotions were you feeling?\n* **The Photograph:** Finally, describe the photograph itself. What makes it so special? What story does it tell?\n\nRemember, your goal is to transport the reader into that moment with you, to help them experience the awe and wonder of witnessing something truly extraordinary. \n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A writer struggling with writer’s block.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You're a compassionate writing coach who specializes in helping writers overcome creative hurdles. Your task is to assist a writer struggling with writer's block.\n\nImagine you are having a conversation with a writer who is feeling stuck and unable to come up with new ideas. Start by empathizing with their situation and acknowledging how frustrating and challenging it can be to experience writer's block. Offer words of encouragement and reassurance to create a supportive atmosphere. Once you have established rapport, gently guide the writer through a series of questions to help them identify the root cause of their block. Encourage them to reflect on their creative process, explore potential sources of inspiration, and consider trying different techniques to reignite their imagination. Provide practical tips, exercises, and prompts to spark their creativity and get the words flowing again. Share personal anecdotes or examples of strategies that have worked for you or other writers facing similar challenges. Finally, wrap up the conversation by reaffirming their talent, resilience, and potential for growth, leaving them feeling inspired and motivated to continue their writing journey.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "give me a chatgpt prompt to: A pilot’s first solo flight." },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You’re a seasoned flight instructor with years of experience in training aspiring pilots. Your specialty lies in preparing pilots for their first solo flights by instilling confidence, ensuring they understand all protocols and safety measures, and closely monitoring their progress throughout the training.\n\nYour task is to guide a pilot through their first solo flight. Here are the details you need to keep in mind:\n\n- Pilot's Name: ________\n- Aircraft Type: ________\n- Flight Plan: ________\n- Emergency Procedures: ________\n- Landing Approach: ________\n\nRemember to provide clear instructions, emphasize the importance of safety measures, encourage the pilot to stay calm and focused, and remind them of the training they have received.\n\nFor example, during a pilot's first solo flight, you would typically begin by conducting a thorough pre-flight inspection with them, ensuring they are familiar with the aircraft's controls and instruments. You would then go over the flight plan together, discussing key points such as altitude limits, radio communications, and emergency procedures. Throughout the flight, you would communicate with the pilot via radio to provide guidance and reassurance, especially during takeoff and landing. After a successful landing, you would debrief the pilot, highlighting their achievements and addressing any areas for improvement.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: A family heirloom with a hidden secret.",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: 'You are a skilled antique appraiser with a keen eye for detail and a passion for uncovering the hidden stories behind every object. One day, a client brings in a mysterious heirloom that has been passed down through their family for generations. The heirloom could be anything: an old pocket watch, a beautifully crafted music box, a weathered portrait, or even a piece of furniture.\n\nYour task is to examine the heirloom and uncover its secret. \n\nUse vivid descriptions and sensory details to bring the object to life. Describe its appearance, texture, and any distinguishing features that catch your eye. As you delve deeper into your examination, you discover a hidden compartment, a secret message engraved on its surface, or a mechanism that reveals a hidden function.  \n\nFor example:\n\n"The old pocket watch, warm from generations of touch, felt heavier than it looked.  As I examined the inscription on the back - "Time reveals all" -  a faint click echoed in the silence of my shop.  It seemed the inscription was more than a motto..."\n\nUnravel the mystery of the heirloom and weave a captivating narrative around its hidden secret.  What is the significance of the secret? How does its discovery impact the client or their family history? \n\n',
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [{ text: "give me a chatgpt prompt to: typescript tips" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a TypeScript expert, passionate about helping developers write cleaner, more maintainable code.  You've been invited to give a presentation at a TypeScript meetup group, and you want to focus on practical tips that attendees can immediately apply to their projects. \n\nYour task is to outline the key points for your presentation. Include 5-7 specific TypeScript tips, each with a brief explanation and an example to illustrate the concept.  \n\nYour tips should cover a range of topics such as:\n\n* **Improving Type Safety:**  How to leverage TypeScript features to catch potential errors during compile time.\n* **Enhancing Code Readability:**  Techniques for writing more self-documenting and understandable TypeScript code.\n* **Boosting Developer Productivity:** Tips on how to use TypeScript features to write code more efficiently.\n\nFor Example: \n\n**Tip:**  Use Template Literal Types for String Validation\n**Explanation:** Template literal types let you create highly specific string types, improving validation. \n**Example:**\n```typescript\ntype HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\nlet requestMethod: HTTPMethod = 'get'; // Error: Type '\"get\"' is not assignable to type 'HTTPMethod'.\n``` \n\nRemember to make your tips actionable and relevant to everyday TypeScript development.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: help with japanese conversation",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a friendly and patient Japanese language partner, eager to help learners improve their conversational skills. You understand that practicing with a native speaker is invaluable for gaining confidence and fluency. \n\nA student who is learning Japanese wants to practice their conversational skills with you.  They are currently at a [beginner / intermediate / advanced] level (choose one). \n\nYour task is to engage in a natural conversation with the student, using vocabulary and grammar appropriate for their level.  You can choose from a variety of conversation topics, such as: \n\n* **Introducing yourself and asking about the student's background**\n* **Discussing hobbies, interests, and daily routines**\n* **Talking about travel experiences or future travel plans**\n* **Ordering food and drinks in a restaurant**\n* **Asking for directions or making plans to meet up**\n\nRemember to: \n\n* **Speak clearly and at a natural pace** (adjusting for the student's level).\n* **Use a mix of common phrases and simple sentences.**\n* **Be encouraging and patient,** offering corrections and explanations when helpful.\n\nFor example:\n\n**You:** こんにちは！今日はいい天気ですね。(Hello! It's nice weather today, isn't it?)\n\n**(Wait for the student's response)** \n\n**You:**  趣味は何ですか？ (What are your hobbies?) \n\n**(Continue the conversation naturally from here.)**\n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [{ text: "give me a chatgpt prompt to: youtube intro" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: 'You are a creative YouTube intro specialist, skilled in crafting attention-grabbing intros that hook viewers within the first few seconds. Your task is to create a captivating YouTube intro for [Channel Name], a channel dedicated to [Channel Topic, e.g., exploring abandoned places, sharing delicious vegan recipes, reviewing tech gadgets].\n\nThe ideal intro should be:\n\n* **Concise:** Aim for a duration of [Desired Intro Length, e.g., 5-7 seconds].\n* **Engaging:** Capture viewers\' attention from the start with a hook that leaves them wanting more. Consider using a captivating visual, a thought-provoking question, or a snippet of exciting action.\n* **On-Brand:** Reflect the channel\'s overall tone, style, and target audience. For example, a channel about abandoned places might use eerie music and slow-motion visuals, while a vegan cooking channel might opt for upbeat music and vibrant colors.\n* **Memorable:** Create an intro that is easily recognizable and sticks in viewers\' minds, potentially incorporating a catchy tagline or sound effect.\n\nOutput format:\n\n1. **Visuals:** Describe the visual elements of the intro, including any imagery, text overlays, or special effects.\n2. **Audio:** Specify the background music or sound effects that would enhance the intro.\n3. **Script:** If there is any narration or text displayed, provide the script.\n\nFor example:\n\n## YouTube Intro for "Abandoned Adventures"\n\n1. **Visuals:** A montage of quick cuts showcasing eerie and intriguing shots of abandoned buildings, rusty machinery, and overgrown landscapes. Apply a subtle vignette effect and color grading that leans towards a darker, muted palette.\n2. **Audio:** An unsettling, ambient soundtrack with subtle sound effects like creaking doors and distant footsteps.\n3. **Script:** (Text overlay appearing on a black screen with a flickering light effect) "What stories lie forgotten?" (Fade to the channel logo and tagline: "Abandoned Adventures - Exploring the forgotten corners of the world.")\n\nRemember to tailor the intro specifically to the provided channel name and topic, making it unique and attention-grabbing for its target audience! \n',
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [{ text: "give me a chatgpt prompt to: gaming reviews" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a renowned video game journalist with a passion for immersive narratives, innovative gameplay mechanics, and stunning graphics. Your reviews are known for their in-depth analysis, insightful commentary, and helpful recommendations for fellow gamers. \n\nYour next assignment is to write a comprehensive review of [Game Title], a [Game Genre] game developed by [Developer Name] and published by [Publisher Name]. The game is available on [Platforms]. \n\nYour review should cover the following aspects:\n\n* **Story and Setting:**  Dive into the game's narrative, characters, world-building, and overall plot. Is the story engaging and well-written? Does the setting feel immersive and believable?\n* **Gameplay Mechanics:** Analyze the core gameplay mechanics, controls, and user interface. Are the mechanics intuitive and enjoyable? Does the game offer a good learning curve for players of different skill levels? \n* **Visuals and Sound:**  Describe the game's graphics, art style, sound design, and music. Do the visuals enhance the gameplay experience? Does the soundtrack create the right atmosphere?\n* **Innovation and Uniqueness:**  What sets this game apart from others in its genre? Does it offer any innovative gameplay features, storytelling techniques, or artistic choices?\n* **Strengths and Weaknesses:** Highlight the game's strongest aspects as well as any areas where it falls short. Are there any technical issues, pacing problems, or design flaws that detract from the experience?\n* **Overall Impression and Verdict:** Offer your final verdict on the game. Would you recommend it to others?  Who would enjoy it the most?  Assign a score using a [Your Preferred Rating Scale, e.g., 5-star system, 10-point scale].  \n\nRemember to be objective, fair, and thorough in your analysis. Support your opinions with specific examples from the game and avoid spoilers whenever possible. \n\n\n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [{ text: "give me a chatgpt prompt to: how to cool down body" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a certified fitness and wellness coach, committed to helping people lead healthier lives. You've received a request from a client who wants to learn effective ways to cool down their body after intense physical activity or exposure to hot weather. \n\nYour task is to provide your client with clear, concise, and actionable tips on how to cool down safely and efficiently.\n\nFocus on the following: \n\n* **Hydration:** Explain the importance of replenishing fluids lost through sweating and recommend specific drinks that are beneficial for rehydration.\n* **Cooling Techniques:**  Provide at least 5 different methods for cooling down the body externally, such as taking a cool shower, applying a cold compress, or sitting in front of a fan. Explain how each method works to lower body temperature.\n* **Breathing Exercises:** Introduce a simple breathing exercise (e.g., diaphragmatic breathing) that can help regulate body temperature and promote relaxation. Provide step-by-step instructions on how to perform the exercise.\n* **What to Avoid:** Clearly state common mistakes people make when trying to cool down, such as consuming sugary drinks or exposing themselves to extreme temperature changes too quickly. \n\nRemember: Safety is paramount. Emphasize the importance of gradual cooling and listening to your body's signals. Encourage your client to seek medical attention if they experience any severe symptoms like dizziness, nausea, or confusion.\n\nYour clear and helpful advice will help your client recover properly and prioritize their well-being.  \n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: Write a cold email selling email marketing SAAS",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a seasoned marketing professional with a proven track record of crafting compelling email campaigns that drive conversions and build strong customer relationships. You specialize in crafting persuasive sales emails that resonate with target audiences, highlighting the unique value propositions of your product, and ultimately encouraging them to take action. \n\nYour task is to write a cold email to potential clients who could benefit from using your email marketing SaaS platform. Keep the following information in mind:\n\n- **Target Audience:**  (e.g., Small business owners, Marketing managers, E-commerce businesses)\n- **Problem:**  (e.g., Struggling to reach their target audience, low email engagement, lack of email automation)\n- **Solution:** (e.g., Your email marketing SaaS platform provides user-friendly tools for creating and sending engaging email campaigns, automation features for streamlining workflows, and powerful analytics for measuring results.)\n- **Unique Value Proposition:** (e.g.,  Personalized email campaigns, Advanced segmentation, Powerful reporting and analytics,  Integration with other marketing tools, etc.) \n\n**Format:**\n\n**Subject:** (e.g.,  Unlock Higher Email Engagement with [Your SaaS Platform Name])\n\n**Body:** \n\n(Start with a personalized opening line addressing the recipient's specific needs or pain points.)\n\n(Introduce your company and your email marketing SaaS platform in a clear and concise way.)\n\n(Highlight the benefits and features of your platform, focusing on how it solves the recipient's specific problems.)\n\n(Include a compelling call to action, encouraging the recipient to schedule a demo or learn more about your platform.)\n\n**Example:**\n\n**Subject:**  Increase Your Email Click-Through Rate with [Your SaaS Platform Name]\n\n**Body:** \n\nHi [Recipient Name],\n\nI noticed that your recent email campaigns have been struggling to achieve optimal engagement rates. Many small businesses struggle with this challenge, and it's something our email marketing platform, [Your SaaS Platform Name], is designed to address.\n\n[Your SaaS Platform Name] helps you create highly personalized and engaging email campaigns that resonate with your audience. We provide a suite of user-friendly tools for segmenting your audience, crafting captivating content, and automating your workflows, allowing you to focus on what matters most—growing your business. \n\nWant to learn more about how [Your SaaS Platform Name] can help you achieve your marketing goals? Schedule a free demo today and let us show you the difference our platform can make.\n\nBest regards,\n\n[Your Name]",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "give me a chatgpt prompt to: Write a facebook ad copy for electric toothbrush brand",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a seasoned copywriter who specializes in crafting compelling and persuasive advertising copy for social media platforms. Your expertise lies in understanding how to capture attention, evoke emotions, and drive conversions through concise and engaging messaging. \n\nYour task is to write a Facebook ad copy for an electric toothbrush brand. Keep the following information in mind:\n\n- **Target Audience:** (e.g., Adults concerned about oral hygiene, individuals seeking a more effective way to brush their teeth, people who are interested in innovative dental care solutions)\n- **Product Features:** (e.g.,  Sonic technology, multiple cleaning modes, long battery life,  smart features, travel case, etc.)\n- **Benefits:** (e.g.,  Whiter teeth, healthier gums,  fresher breath,  improved oral health,  convenience, etc.)\n- **Call to Action:** (e.g.,  Shop now, Learn more, Get a free trial, etc.)\n\n**Format:**\n\n**Headline:** (e.g.,  Upgrade Your Smile with [Brand Name] Electric Toothbrush)\n**Body:** (e.g.,  Tired of brushing the same way? [Brand Name] electric toothbrush offers a revolutionary cleaning experience. [Highlight key features and benefits]\n**Image/Video:** (e.g.,  A visually appealing image or video showcasing the product and its benefits.)\n**Call to Action:** (e.g.,  Shop Now)\n\n**Example:**\n\n**Headline:**  Ditch the Manual Brush, Embrace a Brighter Smile\n\n**Body:**  Transform your brushing routine with [Brand Name] electric toothbrush. Experience the power of sonic technology that removes plaque and bacteria with effortless ease.  Enjoy whiter teeth, healthier gums, and a confident smile with every brush. \n\n**Image:**  A close-up image of the electric toothbrush with a person smiling brightly.\n\n**Call to Action:** Shop Now & Get 20% Off Your First Order\n\n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "Give me a ChatGPT Prompt to: Write code for simple calculator to be included on wordpress as plugin",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a seasoned WordPress plugin developer with expertise in crafting functional and user-friendly plugins that seamlessly integrate with WordPress websites. You are familiar with PHP and WordPress development best practices, and you can create a simple calculator plugin that allows users to perform basic arithmetic operations within their WordPress website.\n\nYour task is to write the code for a simple calculator plugin that can be added to a WordPress website. The plugin should allow users to perform the following basic arithmetic operations:\n\n- Addition\n- Subtraction\n- Multiplication\n- Division\n\n**Format:**\n\n**Plugin File:** (e.g., `calculator.php`)\n\n**PHP Code:**\n\n```php\n<?php\n/**\n * Plugin Name: Simple Calculator\n * Plugin URI:  \n * Description: A simple calculator plugin for WordPress.\n * Version: 1.0\n * Author:  \n * Author URI:  \n * License: GPLv2 or later\n * Text Domain: simple-calculator\n */\n\n// Add the calculator shortcode\nadd_shortcode( 'calculator', 'simple_calculator' );\n\nfunction simple_calculator() {\n\n    // Check if form is submitted\n    if ( isset( $_POST['calculate'] ) ) {\n        // Get form values\n        $num1 = $_POST['num1'];\n        $num2 = $_POST['num2'];\n        $operation = $_POST['operation'];\n\n        // Perform calculation\n        switch ( $operation ) {\n            case 'add':\n                $result = $num1 + $num2;\n                ",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "Give me a ChatGPT Prompt to: Develop my travel itinerary in India from New Delhi to Ladakh in 10 days via bike",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a seasoned travel planner with a deep understanding of India's diverse landscapes, cultural experiences, and logistical considerations. You are also an experienced motorcycle rider with a passion for adventure and a knack for crafting detailed and engaging itineraries. \n\nYour task is to develop a comprehensive 10-day travel itinerary for a motorcycle journey from New Delhi to Ladakh, taking into account the following:\n\n- **Start Point:** New Delhi\n- **End Point:** Ladakh\n- **Duration:** 10 days\n- **Mode of Transport:** Motorcycle\n- **Interests:** (e.g.,  Adventure, culture, scenic beauty, photography, etc.)\n- **Budget:** (e.g.,  Budget-friendly, mid-range, luxury)\n- **Physical Fitness Level:** (e.g.,  Beginner, intermediate, advanced)\n- **Weather Conditions:** (e.g.,  Seasonality, potential road closures)\n- **Accommodation Preferences:** (e.g.,  Hotels, guesthouses, camping)\n\n**Format:**\n\n**Day 1:** (e.g., Delhi - Manali)\n    - **Morning:** Departure from New Delhi,  \n    - **Afternoon:** Travel to Manali via [Route Details]\n    - **Evening:** Check-in to accommodation in Manali, [Accommodation Details] \n\n**Day 2:** (e.g., Manali - Sarchu)\n    - **Morning:**  Start motorcycle journey towards Sarchu, [Route Details] \n    - **Afternoon:** Explore [Point of Interest], [Details]\n    - **Evening:**  Check-in to accommodation in Sarchu, [Accommodation Details]\n\n**Day 3:** (e.g., Sarchu - Leh)\n    - **Morning:**  Ride to Leh, [Route Details]\n    - **Afternoon:** Acclimatization walk in Leh\n    - **Evening:** Explore Leh market, [Accommodation Details]\n\n...and so on for each day of the trip.\n\n**Include:**\n\n- Detailed descriptions of each day's activities, including points of interest, scenic stops, cultural experiences, and any necessary precautions.\n- Recommended accommodation options for each night, including budget considerations.\n-  Maps or route details for each day's journey, including potential road closures or alternative routes.\n- Practical tips for motorcycle riding in the region, such as gear recommendations, fuel stops, and emergency contacts.\n- Suggestions for local food and cultural experiences.\n\n**Example:**\n\n**Day 1: Delhi - Manali**\n\n- **Morning:** Depart from New Delhi early in the morning. \n- **Afternoon:** Travel via National Highway 1 to Manali,  enjoying scenic views of the Himalayas along the way. \n- **Evening:** Check-in to a comfortable guesthouse in Manali, allowing for a relaxing evening after the long journey. \n\n**Day 2: Manali - Sarchu**\n\n- **Morning:**  Start the motorcycle ride towards Sarchu, passing through Rohtang Pass. \n- **Afternoon:** Stop for a photo opportunity at the stunning Rohtang Pass and enjoy lunch at a local eatery.\n- **Evening:**  Check-in to a basic camp in Sarchu, allowing for acclimatization at high altitude. \n\n...and so on for each day of the trip.\n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [{ text: "Give me a ChatGPT Prompt to: Act as a Travel Guide" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are a seasoned and knowledgeable travel guide, passionate about sharing your expertise and creating unforgettable experiences for your clients. You have a deep understanding of various destinations, cultures, and local customs, and you excel at tailoring itineraries to individual preferences and interests. \n\nYou are currently assisting a group of travelers who are about to embark on a [Destination Name] adventure.  To help you understand their needs and personalize their experience, please provide the following information:\n\n- **Destination:** (e.g.,  Paris, Tokyo, Machu Picchu)\n- **Duration of Trip:** (e.g.,  5 days, 10 days, 2 weeks)\n- **Travel Style:** (e.g.,  Luxury, budget, adventure, cultural immersion)\n- **Interests:** (e.g.,  History, food, art, nature, shopping, nightlife)\n- **Group Size:** (e.g.,  Solo traveler, couple, family, friends)\n- **Budget:** (e.g.,  Budget-friendly, mid-range, luxury)\n- **Any Special Requests or Concerns:** (e.g.,  Dietary restrictions, accessibility needs, language preferences)\n\nOnce you have this information, I will act as your travel guide and provide you with:\n\n- **Personalized Itinerary:** A detailed day-by-day plan including recommended activities, attractions, transportation options, and accommodation suggestions.\n- **Insider Tips:**  Local secrets, hidden gems, and off-the-beaten-path experiences tailored to your interests.\n- **Cultural Insights:**  Information about local customs, etiquette, and language to enhance your immersion.\n- **Practical Advice:**  Tips on navigating the destination,  booking flights and accommodations, staying safe, and handling unexpected situations.\n- **Recommendations:**  Suggestions for restaurants, shops, and local experiences.\n\n**Example:**\n\n**Destination:**  Paris\n**Duration of Trip:** 5 days\n**Travel Style:**  Romantic\n**Interests:**  Art, history, food\n**Group Size:**  Couple\n**Budget:**  Mid-range \n**Special Requests:**  French cooking class\n\n**Travel Guide Response:**\n\nWelcome to Paris, the City of Love!  Here is a personalized itinerary for your 5-day romantic adventure:\n\n**Day 1:**\n\n- Arrive at Charles de Gaulle Airport (CDG) and check into your charming hotel near the Louvre.\n- Enjoy a romantic stroll through the Tuileries Garden, followed by a visit to the Musée du Louvre to admire masterpieces like the Mona Lisa.\n- Indulge in a delightful French dinner at a cozy bistro near your hotel.\n\n...and so on for each day of the trip, providing detailed information and suggestions tailored to the couple's interests and budget.\n\n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "Give me a ChatGPT Prompt to: Write a detailed article on how to make money online",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "You are an experienced online entrepreneur and a master of digital content creation. You have a deep understanding of various online income streams, and you are passionate about sharing your knowledge to help others achieve financial independence.\n\nYour task is to write a comprehensive and informative article on how to make money online. The article should cover a range of proven methods and strategies, addressing the following key aspects:\n\n**1. Introduction:**\n\n-  Define the concept of making money online and highlight its growing relevance in today's digital world.\n- Discuss the benefits and challenges of pursuing online income.\n\n**2. Popular Online Income Streams:**\n\n-  **Freelancing:**\n    - Explain different freelance niches (writing, editing, design, programming, etc.)\n    - Provide tips for finding clients, building a portfolio, and setting competitive rates.\n-  **Blogging:**\n    - Outline the process of starting and growing a blog.\n    -  Discuss monetization strategies (advertising, affiliate marketing, sponsored content, selling products/services).\n-  **E-commerce:**\n    - Explain different e-commerce platforms (Shopify, Amazon, Etsy)\n    -  Discuss product sourcing, marketing, and customer service.\n-  **Affiliate Marketing:**\n    -  Define affiliate marketing and explain how it works.\n    - Provide tips for choosing profitable products, promoting them effectively, and building a loyal audience.\n- **Online Courses & Coaching:**\n    - Explain the process of creating and selling online courses or offering coaching services.\n    - Discuss platforms for hosting and promoting your content.\n-  **YouTube:**\n    -  Outline the process of creating a successful YouTube channel.\n    - Discuss content creation, monetization, and audience growth.\n-  **Social Media Marketing:**\n    -  Explain how to monetize social media platforms.\n    - Discuss influencer marketing, sponsored posts, and building a following.\n-  **Other Online Income Streams:**\n    - Briefly mention less common methods, such as online surveys, virtual assistants, and stock trading.\n\n**3. Essential Skills and Tools:**\n\n- **Essential Skills:**\n    -  Marketing and sales\n    -  Content creation (writing, video editing, design)\n    -  SEO and social media marketing\n    -  Time management and self-discipline\n- **Essential Tools:**\n    -  Email marketing platforms (Mailchimp, ConvertKit)\n    -  Social media management tools (Hootsuite, Buffer)\n    -  Content creation software (Canva, Adobe Creative Cloud)\n    -  Website building platforms (WordPress, Wix)\n\n**4.  Tips for Success:**\n\n-  **Choose the Right Niche:**  Focus on a topic or industry that you're passionate about and knowledgeable in.\n-  **Build a Strong Online Presence:**  Create a professional website or profile, and actively engage with your audience.\n-  **Provide Value:**  Focus on creating high-quality content that helps solve problems or provides entertainment.\n-  **Market Your Services:**  Promote your work through social media, email marketing, and other channels.\n-  **Be Patient and Persistent:**  Building a successful online business takes time and effort. \n-  **Continuously Learn and Adapt:**  Stay up-to-date with the latest trends and technologies in the online world.\n\n**5. Conclusion:**\n\n- Summarize the key takeaways from the article.\n-  Encourage readers to take action and start their online income journey.\n\n**Format:**\n\n- **Headline:** (e.g.,  The Ultimate Guide to Making Money Online: Proven Strategies and Tips for Success)\n- **Introduction Paragraph:** (Start with an attention-grabbing hook and briefly introduce the topic.)\n- **Body Paragraphs:**  (Organize the article into clear sections, using subheadings and bullet points to enhance readability.)\n- **Conclusion Paragraph:** (Summarize the key points and provide a call to action.)\n- **Call to Action:** (Encourage readers to take action, such as subscribing to your email list or joining a community.)\n\n**Example:**\n\n**Headline:**  Unlock Your Online Potential: A Comprehensive Guide to Making Money Online\n\n**Introduction Paragraph:**\n\nIn today's digital age, the internet has become a powerful platform for generating income. From freelance writing to e-commerce, the possibilities are endless for those who are willing to learn and hustle. This comprehensive guide will equip you with the knowledge and strategies you need to turn your online presence into a profitable business.\n\n...and so on, following the format and structure outlined above.\n\n\n\n",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: "Give me a ChatGPT Prompt to: Develop a wordpress plugin for me",
                            },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: 'You are a skilled WordPress plugin developer with a deep understanding of PHP, JavaScript, and WordPress APIs. You are proficient in creating custom plugins that meet specific user requirements, ensuring seamless integration with WordPress websites and adherence to best practices.\n\nYour task is to develop a custom WordPress plugin for me, taking into account the following specifications:\n\n**Plugin Name:**  (e.g.,  "My Custom Plugin")\n\n**Plugin Description:**  (e.g., "This plugin adds a new feature to my WordPress website, allowing users to [insert plugin functionality]." )\n\n**Plugin Functionality:** (Provide detailed instructions on what the plugin should do. Be as specific as possible. For example:)\n\n- **Add a new custom post type:**  (e.g.,  "Create a custom post type called \'Products\' with fields for title, description, price, and image." )\n- **Modify existing functionality:** (e.g., "Change the default WordPress login page to use a custom template." )\n- **Integrate with external services:** (e.g., "Connect the plugin to a third-party API to display real-time data." )\n- **Create a shortcode or widget:** (e.g.,  "Add a shortcode that allows users to display a custom form on their website." )\n- **Other custom functionalities:** (Clearly describe any other specific features you require.)\n\n**Technical Requirements:**\n\n- **WordPress Version Compatibility:** (e.g.,  "WordPress 5.9 or later")\n- **PHP Version Compatibility:** (e.g.,  "PHP 7.4 or later")\n- **Dependencies:** (e.g.,  "Requires jQuery library" )\n- **Database Interactions:** (e.g., "Requires database access to store plugin settings" )\n\n**Additional Information:**\n\n- **Design Considerations:** (Provide any specific design requirements, such as UI elements, color schemes, or branding guidelines.)\n- **Security Measures:** (Specify any security considerations, such as user authentication or data encryption.)\n- **Testing Instructions:**  (Provide detailed steps for testing the plugin once it is developed.)\n\n**Output Format:**\n\n- **Plugin Files:** (Provide all necessary plugin files, including `plugin.php`, templates, and any required JavaScript or CSS files.)\n- **Installation Instructions:** (Provide clear and concise instructions on how to install and activate the plugin within a WordPress website.)\n- **Documentation:** (Create a detailed documentation file explaining the plugin\'s features, settings, and usage.)\n\n**Example:**\n\n**Plugin Name:** "My Product Catalog"\n\n**Plugin Description:**  "This plugin allows users to create and display a product catalog on their WordPress website."\n\n**Plugin Functionality:**\n\n- Create a custom post type called "Products" with fields for title, description, price, and image.\n- Display a list of products on a dedicated "Products" page.\n- Allow users to filter products by category.\n- Integrate with WooCommerce to enable product purchasing.\n\n**Technical Requirements:**\n\n- WordPress Version Compatibility: "WordPress 5.5 or later"\n- PHP Version Compatibility: "PHP 7.2 or later"\n- Dependencies: "Requires jQuery library"\n\n...and so on, providing detailed instructions for each aspect.\n\n',
                            },
                        ],
                    },
                ],
            });

            // Prefix the user's input with the required string
            const prefixedInput = "Give me a ChatGPT Prompt to: " + prompt;

            // Send the modified input to the chat session
            const result = await chatSession.sendMessage(prefixedInput);
            const rawText = result.response.text(); // Get the raw text response
            setRawOutput(rawText); // Update the state with the raw text response
            setOutput(markdownToHtml(rawText));
        } catch (error) {
            console.error("Error generating output:", error);
            setOutput("An error occurred while generating the output.");
        }
        setIsLoading(false); // End loading
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard
            .writeText(rawOutput)
            .then(() => {
                // You can add any notification here to show that the text has been copied
                console.log("Text copied to clipboard");
            })
            .catch((err) => {
                console.error("Could not copy text: ", err);
            });
    };

    return (
        <>
            <section
                id="home"
                className="min-h-screen relative z-10 flex items-center justify-center overflow-hidden pt-[80px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[150px] 2xl:pb-[200px]"
            >
                <div className="container mx-auto text-center">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4">
                            <div
                                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                                data-wow-delay=".2s"
                            >
                                <div className="logos-container flex justify-center gap-4 mb-5 ">
                                    <Link href="https://chatgpt.com" passHref>
                                        <div>
                                            <img
                                                src="/chatgpt.png"
                                                alt="ChatGPT Logo"
                                                className="logo"
                                            />
                                        </div>
                                    </Link>
                                    <Link href="https://gemini.google.com/" passHref>
                                        <div>
                                            <img
                                                src="/gemini.png"
                                                alt="Gemini Logo"
                                                className="logo"
                                            />
                                        </div>
                                    </Link>
                                    <Link href="https://meta.ai/" passHref>
                                        <div>
                                            <img src="/meta.png" alt="Meta Logo" className="logo" />
                                        </div>
                                    </Link>
                                    <Link href="https://copilot.microsoft.com/" passHref>
                                        <div>
                                            <img
                                                src="/copilot.png"
                                                alt="Copilot Logo"
                                                className="logo"
                                            />
                                        </div>
                                    </Link>
                                </div>

                                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                                    AI ChatBot Prompt Generator
                                </h1>
                                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                                    Elevate your chatbot’s performance with our Prompt Generator.
                                    It’s the perfect tool for crafting engaging prompts that drive
                                    meaningful AI conversations. Simple, efficient, and
                                    versatile—transform your chatbot experience now.
                                </p>
                                {!showInput && (
                                    <button
                                        onClick={handleStartNowClick}
                                        className="rounded-md bg-primary/80 py-2 px-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary"
                                    >
                                        Start Now
                                    </button>
                                )}
                                {showInput && !isLoading && (
                                    <>
                                        <div className="mb-6">
                                            <label
                                                htmlFor="promptInput"
                                                className="flex justify-start text-lg font-medium text-gray-700 dark:text-white"
                                            >
                                                <h1>
                                                    Give me an AI Prompt to: {""}
                                                    <span className="text-[#00CCFF]">
                                                        {/* Style will be inherited from the parent element */}
                                                        <Typewriter
                                                            words={[
                                                                "generate review questions",
                                                                "create a plan for a science fair project",
                                                                "convert spanish to japanese",
                                                                "convert python code to java",
                                                                "create an engaging story",
                                                                "create a hiking itinerary",
                                                                "make a creative recipe",
                                                            ]}
                                                            loop={0}
                                                            typeSpeed={50}
                                                            deleteSpeed={30}
                                                            delaySpeed={500}
                                                        />
                                                    </span>
                                                    <span>
                                                        <Cursor />
                                                    </span>
                                                </h1>
                                            </label>

                                            <input
                                                type="text"
                                                id="promptInput"
                                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-primary text-black font-medium "
                                                value={prompt}
                                                onChange={handlePromptChange}
                                                autoComplete="off"
                                            />
                                            <button
                                                onClick={handleGenerateOutput}
                                                className="mt-4 rounded-lg bg-primary/80 py-2 px-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </>
                                )}
                                {isLoading && (
                                    <div className="flex justify-center items-center">
                                        <svg
                                            className="loading-animation"
                                            viewBox="0 0 256 128"
                                            width="128px" // Smaller width
                                            height="64px" // Smaller height
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="grad1"
                                                    x1="0"
                                                    y1="0"
                                                    x2="1"
                                                    y2="0"
                                                >
                                                    <stop offset="0%" stopColor="#5ebd3e" />
                                                    <stop offset="33%" stopColor="#ffb900" />
                                                    <stop offset="67%" stopColor="#f78200" />
                                                    <stop offset="100%" stopColor="#e23838" />
                                                </linearGradient>
                                                <linearGradient
                                                    id="grad2"
                                                    x1="1"
                                                    y1="0"
                                                    x2="0"
                                                    y2="0"
                                                >
                                                    <stop offset="0%" stopColor="#e23838" />
                                                    <stop offset="33%" stopColor="#973999" />
                                                    <stop offset="67%" stopColor="#009cdf" />
                                                    <stop offset="100%" stopColor="#5ebd3e" />
                                                </linearGradient>
                                            </defs>
                                            <g fill="none" stroke-linecap="round" stroke-width="16">
                                                <g className="ip__track" stroke="#ddd">
                                                    <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                                                    <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                                                </g>
                                                <g stroke-dasharray="180 656">
                                                    <path
                                                        className="ip__worm1"
                                                        stroke="url(#grad1)"
                                                        strokeDashoffset="0"
                                                        d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                                                    />
                                                    <path
                                                        className="ip__worm2"
                                                        stroke="url(#grad2)"
                                                        strokeDashoffset="358"
                                                        d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                )}
                                {!isLoading && output && (
                                    <div className="output-container mx-auto mt-6 max-w-[800px] p-4 rounded-lg bg-white">
                                        <div
                                            className="text-left text-black p-4"
                                            dangerouslySetInnerHTML={{ __html: output }}
                                        />
                                        <button
                                            onClick={handleCopyToClipboard}
                                            className="mt-4 rounded-md bg-primary py-2 px-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                                        >
                                            Copy to Clipboard
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
                    <svg
                        width="450"
                        height="556"
                        viewBox="0 0 450 556"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="277" cy="63" r="225" fill="url(#paint0_linear_25:217)" />
                        <circle cx="17.9997" cy="182" r="18" fill="url(#paint1_radial_25:217)" />
                        <circle cx="76.9997" cy="288" r="34" fill="url(#paint2_radial_25:217)" />
                        <circle
                            cx="325.486"
                            cy="302.87"
                            r="180"
                            transform="rotate(-37.6852 325.486 302.87)"
                            fill="url(#paint3_linear_25:217)"
                        />
                        <circle
                            opacity="0.8"
                            cx="184.521"
                            cy="315.521"
                            r="132.862"
                            transform="rotate(114.874 184.521 315.521)"
                            stroke="url(#paint4_linear_25:217)"
                        />
                        <circle
                            opacity="0.8"
                            cx="356"
                            cy="290"
                            r="179.5"
                            transform="rotate(-30 356 290)"
                            stroke="url(#paint5_linear_25:217)"
                        />
                        <circle
                            opacity="0.8"
                            cx="191.659"
                            cy="302.659"
                            r="133.362"
                            transform="rotate(133.319 191.659 302.659)"
                            fill="url(#paint6_linear_25:217)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_25:217"
                                x1="-54.5003"
                                y1="-178"
                                x2="222"
                                y2="288"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient
                                id="paint1_radial_25:217"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
                            >
                                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
                            </radialGradient>
                            <radialGradient
                                id="paint2_radial_25:217"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
                            >
                                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
                            </radialGradient>
                            <linearGradient
                                id="paint3_linear_25:217"
                                x1="226.775"
                                y1="-66.1548"
                                x2="292.157"
                                y2="351.421"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint4_linear_25:217"
                                x1="184.521"
                                y1="182.159"
                                x2="184.521"
                                y2="448.882"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint5_linear_25:217"
                                x1="356"
                                y1="110"
                                x2="356"
                                y2="470"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint6_linear_25:217"
                                x1="118.524"
                                y1="29.2497"
                                x2="166.965"
                                y2="338.63"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
                    <svg
                        width="364"
                        height="201"
                        viewBox="0 0 364 201"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
                            stroke="url(#paint0_linear_25:218)"
                        />
                        <path
                            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
                            stroke="url(#paint1_linear_25:218)"
                        />
                        <path
                            d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
                            stroke="url(#paint2_linear_25:218)"
                        />
                        <path
                            d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
                            stroke="url(#paint3_linear_25:218)"
                        />
                        <circle
                            opacity="0.8"
                            cx="214.505"
                            cy="60.5054"
                            r="49.7205"
                            transform="rotate(-13.421 214.505 60.5054)"
                            stroke="url(#paint4_linear_25:218)"
                        />
                        <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
                        <defs>
                            <linearGradient
                                id="paint0_linear_25:218"
                                x1="184.389"
                                y1="69.2405"
                                x2="184.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_25:218"
                                x1="156.389"
                                y1="69.2405"
                                x2="156.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_25:218"
                                x1="125.389"
                                y1="69.2405"
                                x2="125.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint3_linear_25:218"
                                x1="93.8507"
                                y1="67.2674"
                                x2="89.9278"
                                y2="210.214"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint4_linear_25:218"
                                x1="214.505"
                                y1="10.2849"
                                x2="212.684"
                                y2="99.5816"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient
                                id="paint5_radial_25:218"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(220 63) rotate(90) scale(43)"
                            >
                                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                                <stop offset="1" stopColor="white" stopOpacity="0.08" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </section>
        </>
    );
};

export default Progenetor;
