/** 
  * Utility function to log messages in different colors to the console.
  * @param {string} message - The message to log.
  * @param {string} [color=green] - The color of the message. Defaults to 'green'.
  * 
  * Available colors: 'white', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan'.
*/
export function coloredLog(message: string, color: string = "green") {
  const colors: { [key: string]: string } = {
    white: "\x1b[37m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    reset: "\x1b[0m"
  };

  const colorCode = colors[color] || colors.white;

  console.log(`${colorCode}${message}${colors.reset}`);
}