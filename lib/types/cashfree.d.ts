// Simple declaration for @cashfreepayments/cashfree-js
declare module "@cashfreepayments/cashfree-js" {
  export function load(config: { mode: string }): Promise<any>;
}

export {};
