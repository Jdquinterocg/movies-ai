import OpenAI from 'openai';
import driver from './neo4j';
import { CYPHER_GENERATION_TEMPLATE, CYPHER_QA_TEMPLATE } from './templates';

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


const schema = `
Movie: title, description, rating, age_restricted, awarded
  - ACTS_IN <- Actor
  - BELONGS_TO -> Category
  - WON -> Award

Actor: name, age, nationality
  - ACTED_IN -> Movie
  - HAS_WON -> Award

Category: name

Award: name, year
`;

export async function handleQuery(query) {

  let cypherQuery;
  const session = driver.session();

  if (!query || query === null) {
    // Default query to return all movies
    cypherQuery = 'MATCH (m:Movie)<-[:ACTS_IN]-(a:Actor), (m)-[:BELONGS_TO]->(c:Category) RETURN m, collect(a.name) as actors, collect(c.name) as categories LIMIT 1';
  } else {
    // Generate Cypher query
    const cypherPrompt = CYPHER_GENERATION_TEMPLATE.replace('{schema}', schema).replace('{question}', query);
    const cypherResponse = await openAi.chat.completions.create({
      ...openaiParams,
      prompt: cypherPrompt,
    });

    cypherQuery = cypherResponse.data.choices[0].text.trim();
  }

  console.log(cypherQuery)

  // Run Cypher query in Neo4j
  const result = await session.run(cypherQuery);
  const records = result.records.map(record => record.toObject());

  // // Generate a human-readable answer
  // const context = JSON.stringify(records, null, 2);
  // const qaPrompt = CYPHER_QA_TEMPLATE.replace('{context}', context).replace('{question}', query);
  // const qaResponse = await openAi.chat.completions.create({
  //   model: 'text-davinci-003',
  //   prompt: qaPrompt,
  //   max_tokens: 100,
  // });

  // const answer = qaResponse.data.choices[0].text.trim();

  return { cypherQuery, records };
  return { };
}
