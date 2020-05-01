export default {
    items: [
        {
            title: true,
            name: 'Меню',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: 'Профіль',
            url: '/client/profile',
            icon: 'icon-user',
        },
        {
            name: 'Блюда',
            url: '/client/carousels',
            icon: 'icon-plane',

            children: [
                {
                    name: 'Усі блюда',
                    url: '/client/alldishes',
                    icon: 'icon-list',
                },
                {
                    name: 'Типи блюд',
                    url: '/client/cards',
                    icon: 'icon-plus',
                },
                
            ]
        }
    ]
};