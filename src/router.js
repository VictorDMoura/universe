export class Router{
    routes = {}
    add(routeName, page){
        this.routes[routeName] = page
    }

    route(event){
        event = event || window.event
        event.preventDefault()
        window.history.pushState({}, "", event.target.href)

        this.handle()
    }

    handle(){
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        selectedPage(pathname)

        fetch(route)
            .then((data) => {
                return data.text()
            })
            .then((html) => {
                document.querySelector('#app').innerHTML = html
            })
    }
}

function selectedPage(pathname) {
    let actualPage
    switch (pathname) {
        case '/':
            actualPage = document.querySelector('.home')
            if(!actualPage.classList.contains('select')){
                actualPage.classList.add('select')
                document.querySelector('.universe').classList.remove('select')
                document.querySelector('.explore').classList.remove('select')
                
                
            }   
            document.body.classList.add('bg-home')
            document.body.classList.remove('bg-universe')
            document.body.classList.remove('bg-explore')     
            break;
        case '/universe':
            actualPage = document.querySelector('.universe')
            if(!actualPage.classList.contains('select')){
                actualPage.classList.add('select')
                document.querySelector('.home').classList.remove('select')
                document.querySelector('.explore').classList.remove('select')
            } 
            document.body.classList.add('bg-universe')
            document.body.classList.remove('bg-home')
            document.body.classList.remove('bg-explore')        
            break;
        case '/explore':
            actualPage = document.querySelector('.explore')
            if(!actualPage.classList.contains('select')){
                actualPage.classList.add('select')
                document.querySelector('.universe').classList.remove('select')
                document.querySelector('.home').classList.remove('select')
            }
            document.body.classList.add('bg-explore')
            document.body.classList.remove('bg-home')
            document.body.classList.remove('bg-universe')        
            break;
        default:
            document.body.classList.add('bg-home')
            document.body.classList.remove('bg-universe')
            document.body.classList.remove('bg-explore')
            break;
    }    
}