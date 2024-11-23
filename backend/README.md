# TypeScript With Express

## Process
- Make a tsConfig.json file
```bash
npx tsc --init
```
- In the tsConfig set the root and out directory.
- To write ts express we have to install `@types/express`.
- If we get a declairation error for any npm package usealy the types are available in `@types/packageName`

### Search Aglorithm for relevent content 
- Ilastic Search
- Vector Database (More Frefered for this)

### Vector Database
- Embeddings
- Embedding is a vector representation of a text.
- GPT is tained on Vector Embeddings 
- Ex - "Elon bought Twitter" - [6, 4, 8, 0, 7]
- When texts is semilar to the embedding numbers are close to each other.