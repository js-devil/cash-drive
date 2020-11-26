export default function ({ store, redirect }) {
  if (process.server) return;
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user', { user });
  if (!Object.values(user).length) return redirect('/');

  store.commit('set', { user });
  if (user) store.commit('set', { user });

  if (!store.state.user || !store.state.user.loggedIn) {
    return redirect('/');
  }
}
