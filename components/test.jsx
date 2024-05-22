"use client";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Link from "next/link";
import React, { useState } from "react";
import { Cursor, Typewriter } from "react-simple-typewriter";
import "../styles/index.css";

const Hero = () => {
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

    const apiKey = "AIzaSyBbvf9Trd6cJSP6V1PzAHOSIZsPyjTJVOQ";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
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
                ],
            });

            // Prefix the user's input with the required string
            const prefixedInput = "Give me a ChatGPT Prompt to: " + prompt;

            // Send the modified input to the chat session
            const result = await chatSession.sendMessage(prefixedInput);
            const rawText = result.response.text(); // Get the raw text response
            setRawOutput(rawText); // Update the state with the raw text response
            setOutput(markdownToHtml(rawText));
            console.log("Output:", rawText);
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
                                                    <stop offset="0%" stop-color="#5ebd3e" />
                                                    <stop offset="33%" stop-color="#ffb900" />
                                                    <stop offset="67%" stop-color="#f78200" />
                                                    <stop offset="100%" stop-color="#e23838" />
                                                </linearGradient>
                                                <linearGradient
                                                    id="grad2"
                                                    x1="1"
                                                    y1="0"
                                                    x2="0"
                                                    y2="0"
                                                >
                                                    <stop offset="0%" stop-color="#e23838" />
                                                    <stop offset="33%" stop-color="#973999" />
                                                    <stop offset="67%" stop-color="#009cdf" />
                                                    <stop offset="100%" stop-color="#5ebd3e" />
                                                </linearGradient>
                                            </defs>
                                            <g fill="none" stroke-linecap="round" stroke-width="16">
                                                <g class="ip__track" stroke="#ddd">
                                                    <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                                                    <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                                                </g>
                                                <g stroke-dasharray="180 656">
                                                    <path
                                                        class="ip__worm1"
                                                        stroke="url(#grad1)"
                                                        stroke-dashoffset="0"
                                                        d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                                                    />
                                                    <path
                                                        class="ip__worm2"
                                                        stroke="url(#grad2)"
                                                        stroke-dashoffset="358"
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

export default Hero;
