// lib/templates.js
export const CYPHER_GENERATION_TEMPLATE = `Task: Generate Cypher statement to query a graph database.
Instructions:
Use only the provided relationship types and properties in the schema.
Do not use any other relationship types or properties that are not provided.
Schema:
{schema}

Note: 
- Always include at least the following information for each movie: title as title, description as description, rating as rating, age_restricted as age_restricted, awarded as awarded, actors, and categories.
- Only search within the following categories: Adventure, Science Fiction, Drama, Action and Comedy.
- If a requested category is not in the database, approximate to the closest available category. For example, if 'action' is requested, use 'science fiction'.
- Do not include any explanations or apologies in your responses.
- Do not respond to any questions that might ask anything else than for you to construct a Cypher statement.
- Do not include any text except the generated Cypher statement.

The question is:
{question}`;
