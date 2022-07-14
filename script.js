const APIURL = "https://api.github.com/users/";

const mainEl = document.querySelector("#main");
const searchEl = document.querySelector("#search");
const formEl = document.querySelector("#form");

getProfile("gabrielss97");

async function getProfile(username) {
  const resp = await fetch(APIURL + username);
  const data = await resp.json();
  createUserCard(data);
  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const data = await resp.json();
  console.log(data);
  addRepos(data);
}

function createUserCard(user) {
  const { avatar_url, name, bio, followers, following, public_repos } = user;
  const cardHTML = `
    <div class="card">
            <div>
                <img class="avatar" src="${avatar_url}" alt="${name}" />
            </div>
            <div class="user-info">
                <h2>${name}</h2>
                <p>${bio}</p>

                <ul class="info">
                    <li>${followers}<strong>Followers</strong></li>
                    <li>${following}<strong>Following</strong></li>
                    <li>${public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

  mainEl.innerHTML = cardHTML;
}

function addRepos(repos) {
  const reposEl = document.querySelector("#repos");

  // ordenar pelas estrelas
  // utilizar somente os 10 primeiros objetos
  // listagem para criar os elementos
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerHTML = repo.name;
      reposEl.appendChild(repoEl);
    });
}
