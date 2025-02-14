function customRender(reactElement , container){
    // const domElemnt =  document.createElement(reactElement.type)
    // domElemnt.innerHTML = reactElement.children
    // domElemnt.setAttribute('href', reactElement.props.href)
    // domElemnt.setAttribute('target', reactElement.props.target)
    // container.appendChild(domElemnt)

    const domElemnt =  document.createElement(reactElement.type)
    domElemnt.innerHTML = reactElement.children
    for (const prop in reactElement.props) {    
        if(prop === 'children') continue
        domElemnt.setAttribute(prop, reactElement.props[prop])
    }

    container.appendChild(domElemnt)
}


const reactElement = {
    type: 'a',
    props: {
        href: 'https://www.google.com',
        target: '_blank',
        children
    },
    children:'Click me for visit google'
}

const mainContainer = document.querySelector('#root')

customRender(reactElement , mainContainer)