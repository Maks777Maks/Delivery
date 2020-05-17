export default {
    items: [
      // {
      //   name: '������ �볺���',
      //   url: '/admin',
      //   icon: 'icon-speedometer',
      //   badge: {
      //     variant: 'info',
      //     text: 'NEW',
      //   },
      // },
      {
        title: true,
        name: 'Адмін Панель',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''   // optional class names space delimited list for title item ex: "text-center"       
      },
      {
        name: 'Клієнти',
        url: '/admin/client',
        icon: 'icon-people',
        children:[
      {
        name: 'Список клієнтів',
        url: '/admin',
        icon: 'icon-user',
        
      },
      {
        name: 'Постійні користувачі',
        url: '/admin/comments',
        icon: 'icon-user-follow',
      },
        ],
      },
      {
        name: 'Товари',
        url: '/admin/client',
        icon: 'icon-globe',
        children:[
      {
        name: 'Додати страву',
        url: '/admin',
        icon: 'icon-pencil',
        
      },
      {
        name: 'Хіт продаж',
        url: '/admin/bestseller',
        icon: 'icon-list',
      },
        ],
      },
      {
        name: 'Адміністрація',
        url: '/admin/client',
        icon: 'icon-equalizer',
        children:[
      {
        name: 'Видалити користувача',
        url: '/admin',
        icon: 'icon-user-unfollow',
        
      },
      {
        name: 'Видалити страву',
        url: '/admin/comments',
        icon: 'icon-pencil',
      },
        ],
      },
      {
        name: 'Статистика',
        url: '/admin/client',
        icon: 'icon-graph',
        children:[
      {
        name: 'Користувачі',
        url: '/admin',
        icon: 'icon-people',
        
      },
      {
        name: 'Продаж по кухням',
        url: '/admin/graphcuisine',
        icon: 'icon-people',
        
      },
      {
        name: 'Продаж страв',
        url: '/admin/graphtypedishes',
        icon: 'icon-layers',
      },
      {
        name: 'Прибуток',
        url: '/admin/comments',
        icon: 'icon-note',
      },
        ],
      },
    ],
  };
  