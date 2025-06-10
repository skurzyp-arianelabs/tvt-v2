import { CostComparisonTool } from './services/CostComparisonTool';

async function main() {
  try {
    const tool = new CostComparisonTool();
    const response = await tool.run(['hedera', 'solana']);
    console.log(response);
  } catch (error) {
    console.error('An error occurred while running the CostComparisonTool:', error);
  }
}

main();
