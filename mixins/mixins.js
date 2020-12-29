import Swal from 'sweetalert2';
const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/0/03/Forbidden_Symbol_Transparent.svg';

export const Naira = '\u20A6';
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
});

const Mixin = {
  turnToLower(a) {
    for (const i in a) {
      a = {
        ...a,
        [i]: a[i] ? `${a[i]}`.toLowerCase() : null,
      };
    }
    return a;
  },
  showError: (title, text) =>
    Swal.fire({
      imageUrl,
      imageAlt: 'forbidden',
      imageHeight: 150,
      title: title || 'Oops!',
      text,
      // showConfirmButton: false,
    }),

  showToast: ({ type: icon, message: title }) => Toast.fire({ icon, title }),
  formatTime(date) {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();

    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}${ampm}`;
  },
  formatDate: date =>
    date
      ? `${months[new Date(date).getMonth()]} ${new Date(
          date,
        ).getDate()}, ${new Date(date).getFullYear()}`
      : '-',

  numberWithCommas: x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  removeCommas: amount => amount.replace(/,/g, ''),

  capitalize: string => string.charAt(0).toUpperCase() + string.slice(1),
  validateName: value =>
    /^[a-zA-Z]+ [a-zA-Z]+$/.test(value) && value.length > 5,
  validatePassword: value => /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(value),
  validateEmail: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  validatePhone: value => /^\d+$/.test(value) && value.length === 11,
  validateNumbers: value => /^\d+$/.test(value),
  formatAmount: amount =>
    amount
      ? Naira + parseFloat(parseFloat(amount).toFixed(2)).toLocaleString('en')
      : Naira + '0.00',
};

export default Mixin;
