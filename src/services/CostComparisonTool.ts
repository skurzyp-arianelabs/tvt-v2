import { ChainClientFactory } from '../chains/ChainClientFactory';
import { ConfigService } from './ConfigService';
import { IChainClient } from '../chains/IChainClient';
import { TransactionResult } from '../types';

export class CostComparisonTool {
  private configService: ConfigService;
  private chainClientFactory: ChainClientFactory;

  constructor() {
    this.configService = new ConfigService();
    this.chainClientFactory = new ChainClientFactory(this.configService);
  }

  public async run(chains: string[]) {
    // validate params
    const supportedChains = this.chainClientFactory
      .getSupportedChains()
      .map((c) => c.id);
    const invalidChains = chains.filter(
      (chain) => !supportedChains.includes(chain)
    );
    if (invalidChains.length > 0) {
      throw new Error(`Unsupported chains: ${invalidChains.join(', ')}`);
    }

    // Create clients
    const clients = chains.map((chainId) => ({
      chainId,
      client: this.chainClientFactory.createClient(chainId),
    }));

    await this.executeConcurrentOperations(clients);
  }

  private async executeConcurrentOperations(
    clients: Array<{
      chainId: string;
      client: IChainClient;
    }>
  ): Promise<TransactionResult[]> {

    const results: TransactionResult[] = [];

    for (const client of clients) {
      // execute operations and add to results
    }

    return results;
  }
}
