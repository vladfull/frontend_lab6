document.getElementById('fetchButton').addEventListener('click', () => {
    fetch('https://randomuser.me/api?results=3')
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка завантаження даних');
            }
            return response.json();
        })
        .then(data => {
            const users = data.results;
            displayUsersInfo(users);
        })
        .catch(error => {
            console.error('Сталася помилка:', error);
            document.getElementById('usersContainer').innerText = 'Не вдалося отримати інформацію. Спробуйте ще раз.';
        });
});

function displayUsersInfo(users) {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-info');
        userCard.innerHTML = `
            <img src="${user.picture.large}" alt="User Picture">
            <p><strong>Телефон:</strong> ${user.phone}</p>
            <p><strong>Координати:</strong> Широта ${user.location.coordinates.latitude}, Довгота ${user.location.coordinates.longitude}</p>
            <p><strong>Поштовий індекс:</strong> ${user.location.postcode}</p>
            <p><strong>Країна:</strong> ${user.location.country}</p>
        `;
        usersContainer.appendChild(userCard);
    });
}
