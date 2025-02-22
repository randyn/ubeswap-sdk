import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { ChainId, SolidityType } from '../constants'
import { validateAndParseAddress, validateSolidityTypeInstance } from '../utils'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  public readonly chainId: ChainId
  public readonly address: string

  /**
   * Constructs an instance of the base class `Currency`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)
    this.decimals = decimals
    this.symbol = symbol
    this.name = name

    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Token, currencyB: Token): boolean {
  return currencyA.equals(currencyB)
}

export const CELO = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x471EcE3750Da237f93B8E339c536989b8978a438', 18, 'CELO', 'Celo'),
  [ChainId.ALFAJORES]: new Token(ChainId.ALFAJORES, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9', 18, 'CELO', 'Celo'),
  [ChainId.BAKLAVA]: new Token(ChainId.BAKLAVA, '0x765DE816845861e75A25fCA122bb6898B8B1282a', 18, 'CELO', 'Celo')
}

export const cUSD = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    18,
    'cUSD',
    'Celo Dollar'
  ),
  [ChainId.ALFAJORES]: new Token(
    ChainId.ALFAJORES,
    '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
    18,
    'cUSD',
    'Celo Dollar'
  ),
  [ChainId.BAKLAVA]: new Token(
    ChainId.ALFAJORES,
    '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    18,
    'cUSD',
    'Celo Dollar'
  )
}

export const cEUR = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73', 18, 'cEUR', 'Celo Euro'),
  [ChainId.ALFAJORES]: new Token(
    ChainId.ALFAJORES,
    '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F',
    18,
    'cEUR',
    'Celo Euro'
  ),
  [ChainId.BAKLAVA]: new Token(ChainId.BAKLAVA, '0xf9ecE301247aD2CE21894941830A2470f4E774ca', 18, 'cEUR', 'Celo Euro')
}
