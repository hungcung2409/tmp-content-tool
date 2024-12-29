import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    // defaults to process.env["ANTHROPIC_API_KEY"]
    apiKey: "Some test",
});

const systemPrompt = `
    <paragraph>
    You are an English teacher in 8 grade. You help your student understand grammar topics better with natural, concise explanation.
    You will help to write SEO optimized blogposts about english which will be published in my website.
    </paragraph>
    
    <paragraph>
        The tone of the paragraph must be informative and encouraging. I want to have some of 4 key elements of the tone below in tag key-tone:
        <key-tone>
        Informative: The introduction provides clear, factual information, using an example to make the concept more concrete.
        </key-tone>
        <key-tone>
        Empathetic: By acknowledging potential confusion in the topic, the writer establishes a connection with readers and demonstrates understanding of their struggles
        Example:
            - Learning the rules for subject-verb agreement can be difficult at first
            - It’s okay to feel frustrated sometimes – writing in a new language takes time and patience.
        </key-tone>
        <key-tone>
        Encouraging: The introduction promises to clarify the topic which reassures readers that they will gain a better understanding.
        </key-tone>
        <key-tone>
        Approachable: The casual use of relatable language makes the introduction feel less formal and more reader-friendly.
        </key-tone>
    </paragraph>
    
    <paragraph>
        Uses simple vocabulary (e.g., "complete ideas" instead of "independent clauses").
        Breaks the explanation into small, digestible points.
    </paragraph>
`
// Replace placeholders like {{Example}} with real values,
// because the SDK does not support variables.

const examplesPrompt = `
<examples>
    <example>
        <user-input>
            Write an introduction for this topic "Indirect Objects in English, With Examples".
        </user-input>
        <ideal-output>
            In English grammar, an indirect object is the word or phrase that receives the direct object. In the sentence The teacher gave the students cake, the indirect object is the students. The direct object is cake, and the students are the ones who eat it. 
            If you’re confused about what an indirect object is, you’re not alone! Indirect objects are particularly difficult to understand because they’re so closely related to direct objects. This guide clears everything up, with a lot of indirect object examples so you can see how they work. 
        </ideal-output>
    </example>
    <example>
        <user-input>
            Write an introduction for this topic "What Part of Speech Is the Word “The”".
        </user-input>
        <ideal-output>
            The is the most commonly used word in the English language, according to the Oxford English Corpus, making it one of the most important words to learn. Part of learning it is understanding what part of speech is the.
            The can be used as a definite article to refer to something specific or as an adverb when modifying another word.
            We’ll dive further into what part of speech the is and how to use it as a definite article and an adverb, plus we’ll provide examples of the in a sentence.
        </ideal-output>
    </example>
    
    <example>
        <user-input>
            What Is Subject-Verb Agreement?
        </user-input>
        <ideal-output>
            Subject-verb agreement is the grammatical rule that the verb or verbs in a sentence must match the number, person, and gender of the subject; in English, the verb needs to match just the number and sometimes the person. For example, the singular subject it and the plural subject they use different versions of the same verb: “it goes . . . ” and “they go . . . ”
            Learning the rules for subject-verb agreement can be difficult at first, but with enough practice, you’ll find they start to make more sense. Below, we explain everything you need to tackle any subject-verb agreement exercises you come across, including demonstrations of how they work with lots of subject-verb agreement examples.
        </ideal-output>
    </example>
    
    
</examples>
`

const topic = "What Are Possessive pronouns? Definitions and Examples"

const userPrompt = `
    Students do not understand the topic "${topic}"
    Can you write the introduction of a blog which explain this topic to students ?
    I want it contains only 5-8 sentences.
    
    Here is some example of answers I want you to follow:
    ${examplesPrompt}
    
`
// claude-3-5-sonnet-20241022
// claude-3-5-haiku-20241022
anthropic.messages.create({
    model: "claude-3-5-haiku-latest",
    max_tokens: 1000,
    temperature: 0,
    system: systemPrompt,
    messages: [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": userPrompt
                }
            ]
        }
    ]
})
.then(console.log)