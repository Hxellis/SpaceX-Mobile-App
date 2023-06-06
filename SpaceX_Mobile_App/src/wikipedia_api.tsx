import axios from "axios";

export async function getOriginalImageURL(input: String): Promise<string | null> {

    {/* due to wikipedia returning a sci-fi image instead of the spaceX one*/}
    if (input === "Starship") {
        input = "SpaceX_" + input
    }
    {/* due to wikipedia returning the logo .svg instead of actual image*/}
    if (input === "Falcon 9") {
        return "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/11/copernicus_sentinel-6_lifts_off_on_a_spacex_falcon_9_rocket/22340698-1-eng-GB/Copernicus_Sentinel-6_lifts_off_on_a_SpaceX_Falcon_9_rocket_pillars.jpg";
    }
    {/* due to wikipedia returning the logo .svg instead of actual image*/}
    if (input === "Falcon Heavy") {
        return "https://www.spacex.com/static/images/content/fh_performance.jpg";
    }
    try {
      const response = await axios.get(
        'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=' + input
      );
      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const url = pages[pageId].original?.source;
      //returns string URL
      return url;
    } 
    catch (error) {
      console.error('Error fetching original image URL:', error);
      return "https://www2.brockport.edu/live/resource/image/_resources/images/directory_index_default.rev.1649271413.png";
    }
}