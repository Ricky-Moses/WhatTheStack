
const loading = () => {
  const spinner = document.createElement('div');
  spinner.className = 'loading'

  setTimeout(() => spinner.remove(), 800); // Fake load delay
}

export default loading