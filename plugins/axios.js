const apiKey = process.env.apiKey;
const user = JSON.parse(localStorage.getItem('user'));

const auth = user ? { Authorization: `Bearer ${user.token}` } : {};

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.headers = {
      'x-api-key': apiKey,
      Accept: 'application/json',
      ...auth,
    };
    return config;
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    // if (code === 400) {
    //     redirect('/400')
    // }
  });
}
