// CLI styling utilities for beautiful output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

const spinners = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  line: ['⠂', '-', '–', '—', '–', '-'],
  pipe: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
  simpleDots: ['.  ', '.. ', '...'],
  arrow: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
};

export const veloxLogo = `
${colors.bright}${colors.magenta}
██╗   ██╗███████╗██╗      ██████╗ ██╗  ██╗
██║   ██║██╔════╝██║     ██╔═══██╗╚██╗██╔╝
██║   ██║█████╗  ██║     ██║   ██║ ╚███╔╝
╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║ ██╔██╗
 ╚████╔╝ ███████╗███████╗╚██████╔╝██╔╝ ██╗
  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
${colors.reset}`;

export function printVeloxLogo(): void {
  console.log(veloxLogo);
}

export function printLoadingAnimation(
  message: string,
  duration: number = 3000
): Promise<void> {
  return new Promise((resolve) => {
    const frames = spinners.dots;
    let frameIdx = 0;

    const interval = setInterval(() => {
      process.stdout.write(
        `\r${colors.cyan}${frames[frameIdx % frames.length]} ${message}${colors.reset}`
      );
      frameIdx++;
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write('\r' + ' '.repeat(50) + '\r');
      resolve();
    }, duration);
  });
}

export function printSuccess(message: string): void {
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}${message}${colors.reset}`);
}

export function printError(message: string): void {
  console.log(`${colors.red}✗${colors.reset} ${colors.bright}${message}${colors.reset}`);
}

export function printWarning(message: string): void {
  console.log(`${colors.yellow}⚠${colors.reset} ${colors.bright}${message}${colors.reset}`);
}

export function printInfo(message: string): void {
  console.log(`${colors.cyan}ℹ${colors.reset} ${message}`);
}

export function printSeparator(char: string = '─'): void {
  const width = 80;
  console.log(`${colors.gray}${char.repeat(width)}${colors.reset}`);
}

export function printSection(title: string): void {
  console.log('');
  console.log(`${colors.bright}${colors.cyan}╔${'═'.repeat(78)}╗${colors.reset}`);
  console.log(
    `${colors.bright}${colors.cyan}║${colors.reset}  ${colors.bright}${colors.magenta}${title}${colors.reset}${' '.repeat(
      77 - title.length
    )}${colors.bright}${colors.cyan}║${colors.reset}`
  );
  console.log(`${colors.bright}${colors.cyan}╚${'═'.repeat(78)}╝${colors.reset}`);
  console.log('');
}

export function printBox(content: string[]): void {
  const maxLen = Math.max(...content.map((c) => c.length));
  const width = maxLen + 4;

  console.log(`${colors.cyan}╔${'═'.repeat(width)}╗${colors.reset}`);
  content.forEach((line) => {
    const padding = maxLen - line.length;
    console.log(
      `${colors.cyan}║${colors.reset}  ${line}${' '.repeat(padding)}  ${colors.cyan}║${colors.reset}`
    );
  });
  console.log(`${colors.cyan}╚${'═'.repeat(width)}╝${colors.reset}`);
}

export function printKeyValue(key: string, value: string, highlight: boolean = false): void {
  const color = highlight ? colors.bright + colors.yellow : colors.reset;
  console.log(
    `  ${colors.cyan}${key.padEnd(25)}${colors.reset} ${color}${value}${colors.reset}`
  );
}

export function printGradientText(text: string): void {
  const chars = text.split('');
  const gradient = [
    colors.magenta,
    colors.cyan,
    colors.blue,
    colors.cyan,
    colors.magenta,
  ];

  let output = colors.bright;
  chars.forEach((char, i) => {
    output += gradient[i % gradient.length] + char;
  });
  output += colors.reset;
  console.log(output);
}

export async function animatedBoot(): Promise<void> {
  printVeloxLogo();
  console.log('');

  const bootSteps = [
    'Initializing network connection...',
    'Loading solver registry...',
    'Validating configuration...',
    'Starting intent listener...',
  ];

  for (const step of bootSteps) {
    await printLoadingAnimation(step, 600);
    printSuccess(step.replace('...', ''));
  }
}

export function printMetricBox(
  title: string,
  metrics: Array<{ label: string; value: string }>
): void {
  console.log(`  ${colors.bright}${colors.cyan}${title}${colors.reset}`);
  console.log(`  ${colors.gray}${'─'.repeat(76)}${colors.reset}`);
  metrics.forEach(({ label, value }) => {
    printKeyValue(label, value);
  });
}

export function printStatus(
  label: string,
  status: 'active' | 'inactive' | 'pending' | 'error'
): void {
  const icons = {
    active: `${colors.green}●${colors.reset}`,
    inactive: `${colors.red}●${colors.reset}`,
    pending: `${colors.yellow}●${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
  };
  console.log(`  ${icons[status]} ${label}`);
}
