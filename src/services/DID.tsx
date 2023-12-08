import { Domain, Apollo, Castor } from "@atala/prism-wallet-sdk";

export const apollo = new Apollo();
export const castor = new Castor(apollo);
// @TODO: config this secret for PROD
const SECRET = 'THIS_IS_SECRET_CHANGE_ME'

export async function createDID(mnemonics: Domain.MnemonicWordList, services: Domain.Service[]): Promise<Domain.DID> {

    const seed = apollo.createSeed(mnemonics, SECRET);

    const privateKey = apollo.createPrivateKey({
      type: Domain.KeyTypes.EC,
      curve: Domain.Curve.SECP256K1,
      seed: Buffer.from(seed.value).toString("hex"),
    });


    const did = await castor.createPrismDID(privateKey.publicKey(), services);
    return did;
  }