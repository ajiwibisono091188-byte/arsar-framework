/**
 * Simulation Calculator Logic
 */

export function setupCalculator() {
  return {
    principal: 100000000, // Rp 100.000.000
    tenure: 12,          // 12 months
    interestRate: 5,     // 5% p.a.
    downPaymentPercent: 20, // 20%
    
    get downPayment() {
      return (this.principal * this.downPaymentPercent) / 100;
    },
    
    get loanAmount() {
      return this.principal - this.downPayment;
    },
    
    get monthlyPayment() {
      const loan = this.loanAmount;
      const ratePerMonth = (this.interestRate / 100) / 12;
      const months = this.tenure;
      
      if (ratePerMonth === 0) return loan / months;
      
      // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const emi = (loan * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / 
                  (Math.pow(1 + ratePerMonth, months) - 1);
      return Math.round(emi);
    },
    
    get totalInterest() {
      return (this.monthlyPayment * this.tenure) - this.loanAmount;
    },
    
    get totalPayment() {
      return this.monthlyPayment * this.tenure;
    }
  };
}
