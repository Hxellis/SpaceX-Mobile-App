import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    loadingText: {
        fontSize: 30,
        color: "#FFFFFF",
        fontFamily: "PTSans-Bold",
    },
    errorText: {
        fontSize: 30,
        color: "red",
        fontFamily: "PTSans-Bold",
        textAlign: "center"
    },
    errorContainer: {
        flex:1,
        padding: 120,
        
    },

    headerImageContainer: {
        flex: 1,
        padding: 30,
    },
    headerImage: {
        flex: 1,
        width: "100%",
    },

    textAreaContainer:{
        //backgroundColor: "#121121",
        paddingTop: 20,        
        width:"100%",
        flex: 1,
    },
    rocketName:{
        position:"absolute",
        fontSize: 25,
        color: "#FFFFFF",
        fontFamily: "PTSans-Bold",
        textAlign:"center",
        width:"100%",
    },
    rocketCountry:{
        position:"absolute",
        fontSize: 18,
        color: "#FFFFFF",
        fontFamily: "PTSans-Regular",
        textAlign:"center",
        width:"100%",
        paddingTop: 10
    },

    
    scrollContainer: {
        //backgroundColor: "#121121",
    },
    rocketImage: {
        flex: 1,
        width: "100%",
        height: "auto"
    },

    dotsContainer:{
        //backgroundColor: "#121121",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom: 30
    },
    dots:{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
});

export const detailStyles = StyleSheet.create({
    backgroundImage: {
        height: "100%",
        width: "100%",
    },
    backgroundImageDarken: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, .7)', 
    },
    titleContainer: {
        padding: 30,
    },
    sectionContainer: {
        width: "90%",
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, .7)', 
    },
    table: {
        width: "90%",
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, .7)', 
    },
    tableRow:{
        borderBottomWidth: 0,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, .7)',
    },
    
    title: {
        color:"#FFFFFF", 
        fontSize:50,
        fontFamily: "PTSans-Bold",
    },
    subtitle: {
        color:"#FFFFFF", 
        fontSize:25,
        margin: 10,
        fontFamily: "PTSans-Bold",
        textAlign:'center',
    },
    contentText: {
        color:"#FFFFFF", 
        fontSize:13,
        fontFamily: "PTSans-Regular",
        textAlign:'justify',
    },
    wikiLink: {
        color:"#FFFFFF", 
        fontSize:20,
        fontFamily: "PTSans-BoldItalic",
        textAlign:'center',
        textDecorationLine: 'underline'
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "PTSans-Bold",
        letterSpacing: 1,
        color: 'white',
    },
});
    