
const main = document.getElementById('main')

async function fetchUser(page){
    try{
       let res = await fetch(`http://localhost:2000/user?size=5&page=${page}`)
       let users = await res.json()
       var data = users.users
       console.log(data)

    } catch (e){
        console.log(e)
    }

    var div = document.createElement('div')

    data.forEach((item)=>{
        var p = document.createElement('p')
        
        p.innerHTML = item.name
        div.append(p)
    })

    let btn = document.createElement('button')
    btn.innerText = 'Next'
    
    btn.onclick(nextPage(page+1))
    
    main.append(div, btn)
    
}

fetchUser()

function nextPage(page){
    main.innerHTML = null;
    fetchUser(page+1)

}
