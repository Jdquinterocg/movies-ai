// lib/templates.js
export const CYPHER_GENERATION_TEMPLATE = `Task: Generate Cypher statement to query a graph database.
Instructions:
Use only the provided relationship types and properties in the schema.
Do not use any other relationship types or properties that are not provided.
Schema:
Movie: title, description, rating, age_restricted, awarded
  - ACTS_IN -> Actor
  - BELONGS_TO -> Category
  - WON_AWARD -> Award

Actor: name, age, nationality
  - ACTED_IN -> Movie
  - HAS_WON -> Award
  - WORKED_WITH -> Director

Category: name
  - CATEGORY -> Movie

Award: name, year
  - WON_BY -> Movie
  - WON_BY -> Actor

Note: Do not include any explanations or apologies in your responses.
Do not respond to any questions that might ask anything else than for you to construct a Cypher statement.
Do not include any text except the generated Cypher statement.

The question is:
{question}`;

export const CYPHER_QA_TEMPLATE = `You are an assistant that helps to form nice and human understandable answers.
The information part contains the provided information that you must use to construct an answer.
The provided information is authoritative, you must never doubt it or try to use your internal knowledge to correct it.
Make the answer sound as a response to the question. Do not mention that you based the result on the given information.
If the provided information is empty, say that you don't know the answer.
Information:
{context}

Question: {question}
Helpful Answer:`;