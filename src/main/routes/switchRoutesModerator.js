import { PublicMapView, PinView, ModerationMapView } from 'views'

const dashboardRoutes = [{
        path: "publicPins",
        layout: "/",
        name: "PublicMapView",
        component: PublicMapView,
    },
    {
        path: "pin/:id",
        layout: "/",
        name: "PinView",
        component: PinView
    },
    {
        path: "moderatedPins",
        layout: "/",
        name: "ModerationMapView",
        component: ModerationMapView
    }
];

export default dashboardRoutes;