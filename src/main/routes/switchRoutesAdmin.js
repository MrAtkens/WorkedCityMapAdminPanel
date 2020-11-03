import { ModeratorsView, UsersView } from 'views'

const dashboardRoutes = [
    {
        path: "moderators",
        layout: "/",
        name: "Moderators Dash Board",
        component: ModeratorsView
    },
    {
        path: "users",
        layout: "/",
        name: "Users Dash Board",
        component: UsersView
    }
];

export default dashboardRoutes;