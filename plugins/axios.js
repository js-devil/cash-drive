const apiKey = process.env.apiKey;

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.headers = {
      'x-api-key': apiKey,
      Accept: 'application/json',
    };
    return config;
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    console.log('Axios Error ', code);
    // if (code === 400) {
    //     redirect('/400')
    // }
  });
}
