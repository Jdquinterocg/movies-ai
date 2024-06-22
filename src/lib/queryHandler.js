import OpenAI from 'openai';
import driver from './neo4j';
import { CYPHER_GENERATION_TEMPLATE } from './templates';

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

  try {
    if (!query || query === null) {
      // Default query to return all movies
      cypherQuery = `
        MATCH (m:Movie)<-[:ACTS_IN]-(a:Actor), (m)-[:BELONGS_TO]->(c:Category) 
        RETURN m.title AS title, m.description AS description, m.rating AS rating, m.age_restricted AS age_restricted, m.awarded AS awarded, collect(a.name) AS actors, collect(c.name) AS categories 
        LIMIT 1
      `;
    } else {
      // Generate Cypher query
      const cypherPrompt = CYPHER_GENERATION_TEMPLATE
        .replace('{schema}', schema)
        .replace('{question}', query);

      const cypherResponse = await openAi.chat.completions.create({
        messages: [{ role: "system", content: cypherPrompt }],
        model: "gpt-4o",
      });
      cypherQuery = cypherResponse.choices[0].message.content.replace('cypher', '').replaceAll('`', '');
    }

    // console.log(cypherQuery);

    // Run Cypher query in Neo4j
    const result = await session.run(cypherQuery);
    const records = result.records.map(record => record.toObject());

    return { cypherQuery, records };

  } catch (error) {
    console.error('Error running query:', error);
    throw new Error('Failed to execute query');
  } finally {
    await session.close();
  }
}