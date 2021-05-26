export default function ({ app, route, redirect }) {
  if (route.path === '/auth/register') {
    // leave them here
  } else if (route.path === '/auth/login') {
    if (!app.$fire.auth.currentUser) {
      // leave them here
    } else {
      return redirect('/')
    }
  } else if (route.path !== '/auth/register' && route.path !== '/auth/login') {
    if (!app.$fire.auth.currentUser) {
      return redirect('/auth/login')
    }
  }
}
