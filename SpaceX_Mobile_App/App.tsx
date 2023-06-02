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
import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView,ScrollView, StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

import RootStack from './src/RootStack';/*
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
*/

export default function App() {
  /*
  let [fontsLoaded] = useFonts({
    "dosis_medium": require("./assets/fonts/dosis_medium.ttf"),
    "dosis_book": require("./assets/fonts/dosis_book.ttf")
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }*/

  return(
    <RootStack/>
  );
}


/*
type SectionProps = PropsWithChildren<{title: string;}>;

//format of each section
function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle,{color: isDarkMode ? Colors.white : Colors.black,},]}>
        {title}
      </Text>
      <Text style={[styles.sectionDescription,{color: isDarkMode ? Colors.light : Colors.dark,},]}>
        {children}
      </Text>
    </View>
  );
}

//css
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

//basically main()
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Header />

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>

          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>

          <Section title="Debug">
            <DebugInstructions />
          </Section>

          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>

          <LearnMoreLinks />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
*/