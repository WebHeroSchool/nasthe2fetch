let preloader = document.querySelector(".container");
let timestamp = new Date();

let url = window.location.toString();

let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if (userName === undefined){
        userName = 'nasthe2';
    }
    return userName
}

let name = getUsername(url);

let getDate = new Promise((resolve, reject) => {
  setTimeout(() => timestamp ? resolve(timestamp) : reject ('Время не определено'), 6000)
});

let dataRequest = fetch(`https://api.github.com/users/${name}`);

fetch('https://api.github.com/users/' + name)

Promise.all([dataRequest, getDate])
  .then(([request, date]) => {
    requestInfo = request;
    requestDate = date;
  })
  .then(res => requestInfo.json())
  .then(json => {
    let avatar = json.avatar_url;
    let name = json.login;
    let bio = json.bio;
    let profile =json.html_url;
      if (name) {

        let addAvatar = () => {
          let newAvatar = document.createElement('img');
          newAvatar.src = avatar;
          let addString = document.createElement('br');
          document.body.appendChild(newAvatar);
          document.body.appendChild(addString);
        }

        let addBio = () => {
          et newBio = document.createElement('p');
          newBio.innerHTML = bio;
          document.body.appendChild(newBio);
        }

        let addProfile = () => {
          let elementForLink = document.createElement('a');
          let elementForHeader = document.createElement('h2');
          elementForHeader.innerText = name;
          elementForLink.href = profile;
          document.body.appendChild(elementForLink);
          elementForLink.appendChild(elementForHeader);
        }

        let addDate = () => {
          let newDate = document.createElement('p');
          newDate.innerHTML = requestDate;
          body.appendChild(newDate);
        }
    
        preloader.style.display = 'none';

        addProfile();
        addBio();
        addAvatar();
        addDate();
        
      } else {
          alert(' Профиль не найден')
      }
  })

  .catch(err => alert(err + ' Профиль не найден'));

