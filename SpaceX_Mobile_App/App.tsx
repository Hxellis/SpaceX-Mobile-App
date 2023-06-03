/*
Requirements
============
1. Home screen - List rockets info (shows the name, image, country, etc.)
2. Details screen - Tap on any rocket info from the home page to open this screen. (show full details of the selected rocket)
3. Demonstrate the usage of search, filter & pagination capability.
4. Demonstrate state handling: validation, success, error, loading, transitioning, and so on.
5. Show a one-time popup message when it first lands on the home screen. The subsequent visit to the home page shouldn't display this popup message again. 
6. Github (Push series of commits to your repository)
7. Write clean code.

Technologies
============
1. Use Typescript
2. Use React Native (using React Hook)
3. Use SpaceX GraphQL API https://api.spacex.land/graphql/ 

Bonus Points
============
1. UI visual matter. A good-looking app is better.
2. Coding style matters. Good-looking code is just as important.
3. Complete the project within 3 days.
4. Build your backend GraphQL API using Nest.js.
5. Show the full CRUD capability.
6. Wow us. :)
*/


//libraries import
import React, { FunctionComponent } from "react";
import * as ReactDOM from "react-dom";
import Navigator from "./src/Navigator";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
  cache: new InMemoryCache()
})

export default function App() {
;    return (
		<ApolloProvider client={client}>
			<Navigator/>
		</ApolloProvider>
		
    );
};