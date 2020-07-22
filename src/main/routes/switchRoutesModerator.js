import { MainMap, PublicPinView } from 'containers'

const dashboardRoutes = [{
        path: "map",
        layout: "/",
        name: "MainMap",
        component: MainMap,
    },
    {
        path: "pin/:id",
        layout: "/",
        name: "PinView",
        component: PublicPinView
    }
];

export default dashboardRoutes;