import axios from 'axios';
export async function getPhoto(searchText, page) {
  try {
    const {
      data: { hits, totalHits },
    } = await axios.get(
      `https://pixabay.com/api/?key=27139815-fb619e7492dcf89fe4b1aaf4f&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
    );
    return { totalHits, hits };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
