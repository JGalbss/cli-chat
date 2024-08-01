export const startLoader = () => {
    const frames = ['|', '/', '-', '\\'];
    let i = 0;
  
    return setInterval(() => {
      process.stdout.write(`\r${frames[i++ % frames.length]} Loading...`);
    }, 100);
  };
  
  export const stopLoader = (loader: NodeJS.Timeout) => {
    clearInterval(loader);
    process.stdout.write('\rDone!          \n');
  };