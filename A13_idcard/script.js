fetch('https://dummyjson.com/users')
.then(res => res.json())
.then(data => {
    const num = 5
    const firstName = [];
    const lastName = [];
    const age = [];
    const phoneNum = [];
    const title = [];
    const div = document.querySelector(".main");
    //(data.users.slice(0,num)) breaks the code if the previous line doesnt have explicit semicolon, ASI bug
    data.users.slice(0,num).forEach(user => {
        firstName.push(user.firstName);
        lastName.push(user.lastName);
        age.push(user.age);
        phoneNum.push(user.phone)
        title.push(user.company.title);        
    });
    
    for(i=0;i<num;i++){
        const id = document.createElement('div');
        id.classList.add('id-card');
        id.innerHTML = 
            `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="top"><path fill="#0099ff" fill-opacity="1" d="M0,224L48,234.7C96,245,192,267,288,250.7C384,235,480,181,576,160C672,139,768,149,864,165.3C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <img class="photo" alt="photo"></img>
            <div class='name'>
                <h2>${firstName[i]} ${lastName[i]}, ${age[i]} </h2>
            </div>
            <h2 class='title'>${title[i]}</h2>
            <h2 class='phone-num'>${phoneNum[i]}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="bottom"><path fill="#0099ff" fill-opacity="1" d="M0,96L48,117.3C96,139,192,181,288,176C384,171,480,117,576,101.3C672,85,768,107,864,112C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>`
        div.appendChild(id);
    }

    const img = document.querySelectorAll(".photo")
    img.forEach(photo => photo.src = 'https://cdn-icons-png.freepik.com/512/10015/10015419.png')
});
    
    