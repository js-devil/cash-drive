export default function ({ store, redirect }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return redirect('/');
  store.commit('set', { user });
  if (user) store.commit('set', { user });
}
