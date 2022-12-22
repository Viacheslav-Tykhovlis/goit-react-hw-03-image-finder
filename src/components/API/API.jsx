import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30132115-7f2225df990f8cd81354d9436';

export async function getImages(text, page) {
  const { data } = await axios.get(
    `?q=${text}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
}
