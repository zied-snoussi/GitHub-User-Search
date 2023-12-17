function fetchGitHubStats() {
    const inputUsername = document.getElementById('github-username').value;

    if (!inputUsername) {
        alert('Please enter a GitHub username.');
        return;
    }

    const apiUrl = `https://api.github.com/users/${inputUsername}`;

    // Fetch GitHub user data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant GitHub user stats
            const {
                login,
                name,
                bio,
                avatar_url,
                location,
                public_repos,
                followers,
                following,
                created_at,
                updated_at,
                blog,
                twitter_username,
                company,
                email,
                public_gists,
            } = data;

            // Dynamically create HTML content for user stats
            const githubStatsElement = document.getElementById('github-stats');
            githubStatsElement.innerHTML = `
                <div class="github-stats-container">
                    <img src="${avatar_url}" alt="User Photo" class="user-photo">
                    <h2>${name || login}'s GitHub Stats</h2>
                    <p class="stats-item">Username: ${login}</p>
                    <p class="stats-item">Bio: ${bio || 'Not specified'}</p>
                    <p class="stats-item">Location: ${location || 'Not specified'}</p>
                    <p class="stats-item">Repositories: ${public_repos}</p>
                    <p class="stats-item">Gists: ${public_gists}</p>
                    <p class="stats-item">Followers: ${followers}</p>
                    <p class="stats-item">Following: ${following}</p>
                    <p class="stats-item">Member since: ${new Date(created_at).toLocaleDateString()}</p>
                    <p class="stats-item">Last updated: ${new Date(updated_at).toLocaleDateString()}</p>
                    <p class="stats-item">Website: ${blog ? ['<a href="https://' + blog + '">' + blog + '</a>'] : 'Not specified'}</p>
                    <p class="stats-item">Twitter: ${twitter_username || 'Not specified'}</p>
                    <p class="stats-item">Company: ${company || 'Not specified'}</p>
                    <p class="stats-item">Email: ${email || 'Not specified'}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching GitHub data:', error);
            document.getElementById('github-stats').innerHTML = 'Error fetching GitHub data';
        });
}