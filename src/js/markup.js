export function cardMarkup(photos) {
  return photos
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `  <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" width="300" height="200" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:${likes}</b>
          </p>
          <p class="info-item">
            <b>Views:${views}</b>
          </p>
          <p class="info-item">
            <b>Comments:${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads:${downloads}</b>
          </p>
        </div>
      </div>`,
    )
    .join('');
}
