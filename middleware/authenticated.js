export default function ({ store, redirect }) {
  if (process.server) return;
  const user = JSON.parse(localStorage.getItem('user'));
  store.commit('set', { user });
  if (user) store.commit('set', { user });

  console.log(user);

  if (!store.state.user || !store.state.user.loggedIn) {
    return redirect('/');
  }
}
