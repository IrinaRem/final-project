// script.js
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '4zu9L9j8FY3DrXrlUV28SqO1gnTPmksPsCH0KrYyvjdOFKTfq2DYBGBd';
    const keywords = ['nature', 'city', 'space', 'ocean']; // Массив ключевых слов для поиска
    let query = keywords[Math.floor(Math.random() * keywords.length)]; // Выбор случайного ключевого слова
    let apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;
    const imageElement = document.getElementById('random-photo');
    const photographerName = document.getElementById('photographer-name');
    const likeButton = document.getElementById('like-button');
    const likeCountElement = document.getElementById('like-count');
    let likeCount = localStorage.getItem('likes') || 0;
    likeCountElement.textContent = likeCount;

    function fetchRandomPhoto() {
        fetch(apiUrl, { headers: { 'Authorization': apiKey } })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const photo = data.photos[0];
            imageElement.src = photo.src.large;
            photographerName.textContent = `Фотограф: ${photo.photographer}`;
            imageElement.alt = `Фото от ${photo.photographer}`;
        })
        .catch(error => {
            console.error('Ошибка при загрузке изображения:', error);
            photographerName.textContent = 'Не удалось загрузить изображение.';
        });
    }

    likeButton.addEventListener('click', function() {
        likeCount++;
        localStorage.setItem('likes', likeCount);
        likeCountElement.textContent = likeCount;
    });

    fetchRandomPhoto();
});
